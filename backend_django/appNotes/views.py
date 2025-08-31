import json, datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import modelUser
from .models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decRequiredBodyParams import decRequiredBodyParams

class viewNotes(View):
    def get(self, request):
        try:
            if (request.GET.get('filter') == 'links'):
                notesLinks = [note.getNoteLink() for note in modelNotes.objects.all().order_by("name")]
                return CustomJsonResponse(result={'notesLinks': notesLinks})
            
            notes = [note.returnForTable() for note in modelNotes.objects.all().order_by("name")]
            return CustomJsonResponse(result={'notes': notes})
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['name', 'text', 'link', 'is_cipher', 'open_for_all', 'edit_everyone', 'userLogin']))
    def postNoteCreate(self, request):
        try:
            body = json.loads(request.body)
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
    
    @method_decorator(decRequiredBodyParams(['noteLink']))
    def postNoteGet(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            note = modelNotes.objects.get(link=body['noteLink']).returnOne()
            
            if (not note):
                raise
            
            if (not isinstance(note.get('open_for_all'), bool)):
                raise
            
            if (not note.get('open_for_all') and request.user_data.get('userLogin') == None):
                return CustomJsonResponse(status=401)
            
            if (not note.get('open_for_all') and request.user_data.get('userLogin') != note['author']['login']):
                return CustomJsonResponse(status=403)
            
            return CustomJsonResponse(result={'note': note})
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['action']))
    def post(self, request):
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
    
    @method_decorator(decRequiredBodyParams(['name', 'text', 'is_cipher', 'open_for_all', 'edit_everyone', 'noteLink']))
    def patch(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            note = modelNotes.objects.get(link=body.get('noteLink')).returnOne()
            
            if (note == None):
                raise
            
            if (not isinstance(note.get('edit_everyone'), bool)):
                raise
            
            if (not note.get('edit_everyone') and request.user_data.get('userLogin') == None):
                return CustomJsonResponse(status=401)
            
            if (not note.get('edit_everyone') and request.user_data.get('userLogin') != note['author']['login']):
                return CustomJsonResponse(status=403)
            
            modelNotes.objects.filter(link=body.get('noteLink')).update(
                    name = body.get('name'),
                    text = body.get('text'),
                    link = body.get('noteLink'),
                    is_cipher = body.get('is_cipher'),
                    open_for_all = body.get('open_for_all'),
                    edit_everyone = body.get('edit_everyone'),
                    owner = modelUser.objects.get(login=note['author']['login']),
                    updated_at = datetime.datetime.now()
                )
            return CustomJsonResponse(message='Заметка успешно изменена')
            
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['noteId']))
    def delete(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            note = modelNotes.objects.get(id=body.get('noteId')).returnOne()
            
            if (request.user_data.get('userLogin') == None):
                return CustomJsonResponse(status=401)
            
            if (request.user_data.get('userLogin') != note['author']['login']):
                return CustomJsonResponse(status=403)
            
            note = modelNotes.objects.get(id=body.get('noteId'))
            modelNotes.objects.filter(id=body.get('noteId')).delete()
            modelNotesDeleted(name = note.name,
                    text = note.text,
                    link = note.link,
                    is_cipher = note.is_cipher,
                    open_for_all = note.open_for_all,
                    edit_everyone = note.edit_everyone,
                    owner = note.owner).save()
            return CustomJsonResponse(message='Заметка успешно удалена')
        except:
            return CustomJsonResponse(status=400)