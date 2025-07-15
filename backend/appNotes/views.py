import json, datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import modelUser
from .models import modelNotes

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decAllowedActions import decAllowedActions
from decorators.decUserInfo import decUserInfo

from utils.isValuesInRequestBody import isValuesInRequestBody

class viewNotes(View):
    def get(self, request, *args, **kwargs):
        try:
            notes = [note.returnForTable() for note in modelNotes.objects.filter(is_active=True).order_by("name")]
            return CustomJsonResponse(result={'notes': notes})
        except:
            return CustomJsonResponse(status=400)
        
    def postNoteCreate(self, request):
        try:
            requiredBodyParams = ['name', 'text', 'link', 'is_cipher', 'open_for_all', 'edit_everyone', 'userLogin']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelNotes(name = body.get('name'),
                        text = body.get('text'),
                        link = body.get('link'),
                        is_cipher = body.get('is_cipher'),
                        open_for_all = body.get('open_for_all'),
                        edit_everyone = body.get('edit_everyone'),
                        owner = modelUser.objects.get(login=body.get('userLogin'))
                            ).save()
            return CustomJsonResponse(message='Заметка успешно создана')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decUserInfo())
    def postNoteGet(self, request, **kwargs):
        try:
            requiredBodyParams = ['noteLink']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            note = modelNotes.objects.get(link=body['noteLink']).returnOne()
            
            if (not note):
                raise
            
            if (isinstance(note.get('open_for_all'), bool) and note.get('open_for_all')):
                return CustomJsonResponse(result={'note': note})
            
            if (not note.get('open_for_all') and kwargs.get('userLogin') == None):
                return CustomJsonResponse(status=401)
            
            # если заметка open_for_all = false и запрос делает не автор заметки, то отдаем 403
            if (not note.get('open_for_all') and kwargs.get('userLogin') != note['author']['login']):
                return CustomJsonResponse(status=403)
            
            return CustomJsonResponse(result={'note': note})
        except:
            return CustomJsonResponse(status=400)
        
    def post(self, request, *args, **kwargs):
        try:
            action = json.loads(request.body).get('action')
            
            if (not action):
                raise
            
            if (action == 'noteCreate'):
                return self.postNoteCreate(request)
            elif (action == 'noteGet'):
                return self.postNoteGet(request)
            else:
                raise
        except:
            return CustomJsonResponse(status=400)
        
    @method_decorator(decUserInfo())
    def patch(self, request, *args, **kwargs):
        try:
            requiredBodyParams = ['name', 'text', 'link', 'is_cipher', 'open_for_all', 'edit_everyone', 'noteId']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            edit_everyone = None
            if (isinstance(body.get('edit_everyone'), bool)):
                edit_everyone = body.get('edit_everyone')
            
            
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelNotes.objects.filter(id=body.get('noteId')).update(
                    name = body.get('name'),
                    text = body.get('text'),
                    link = body.get('link'),
                    is_cipher = body.get('is_cipher'),
                    open_for_all = body.get('open_for_all'),
                    edit_everyone = body.get('edit_everyone'),
                    owner = modelUser.objects.get(login=body.get('userLogin')),
                    updated_at = datetime.datetime.now()
                )
            return CustomJsonResponse(message='Заметка успешно изменена')
        except:
            return CustomJsonResponse(status=400)
    
    def delete(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            noteId = body.get('noteId')
            
            if (not noteId):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelNotes.objects.filter(id=noteId).update(is_active=False)
            return CustomJsonResponse(message='Заметка успешно удалена')
        except:
            return CustomJsonResponse(status=400)