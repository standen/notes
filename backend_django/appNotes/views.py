import json, datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import modelUser
from .models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decAuthRequired import decAuthRequired
from decorators.decValidateReq import decValidateReq

from api.json_schemes.constants import PATH_NOTES

class viewNotes(View):
    @method_decorator([decValidateReq(f'{PATH_NOTES}/NotesListRequest.schema.json')])
    def getNotesList(self, request, **kwargs):
        try:
            user_filter = kwargs.get('filter')
            
            if (user_filter == 'mine'):
                login = request.user_data.get('user_login')
                
                if not login:
                    return CustomJsonResponse(status=401)
                
                userNotes = [note.returnForTable() for note in modelNotes.objects.filter(owner=modelUser.objects.get(login=login), open_for_all=False)]
                
                return CustomJsonResponse(result={'notes': userNotes})
            
            if (user_filter == 'all'):
                login = request.user_data.get('user_login')
                
                if not login:
                    return CustomJsonResponse(status=401)
                
                openNotes = []
                userNotes = []
                
                userNotes = [note.returnForTable() for note in modelNotes.objects.filter(owner=modelUser.objects.get(login=login), open_for_all=False)]
                openNotes = [note.returnForTable() for note in modelNotes.objects.filter(open_for_all=True)]
                
                notes = [*openNotes, *userNotes]
            
                return CustomJsonResponse(result={'notes': notes})
            
            if (user_filter == 'open'):
                openNotes = [note.returnForTable() for note in modelNotes.objects.filter(open_for_all=True)]
                return CustomJsonResponse(result={'notes': openNotes})
            
            raise
        except:
            return CustomJsonResponse(status=500, message='При получении списка заметок произошла ошибка')
        
    @method_decorator([decValidateReq(f'{PATH_NOTES}/NotesLinksRequest.schema.json')])
    def getNotesLinks(self, request, **kwargs):
        try:
            print(1)
        except:
            return CustomJsonResponse(status=500, message='При получении списка заметок произошла ошибка')
        
    @method_decorator([decValidateReq(f'{PATH_NOTES}/NoteParamsRequest.schema.json')])
    def getNoteParams(self, request, **kwargs):
        try:
            print(1)
        except:
            return CustomJsonResponse(status=500, message='При получении списка заметок произошла ошибка')
    
    def get(self, request):
        try:
            action = request.GET.get('action')
            
            if (action == 'get_notes_list'):
                return self.getNotesList(request)
            elif (action == 'get_notes_links'):
                return self.getNotesLinks(request)
            elif (action == 'get_note_params'):
                return self.getNoteParams(request)
            else:
                raise
            
            
            if (request.GET.get('filter') == 'links'):
                notesLinks = [note.getNoteLink() for note in modelNotes.objects.all().order_by("name")]
                return CustomJsonResponse(result={'notesLinks': notesLinks})
            
            notes = [note.returnForTable() for note in modelNotes.objects.all().order_by("name")]
            return CustomJsonResponse(result={'notes': notes})
        except:
            return CustomJsonResponse(status=400)
    
    def postNoteList(self, request):
        try:
            openNotes = []
            userNotes = []
            
            login = request.user_data.get('userLogin')
            if (login):
                userNotes = [note.returnForTable() for note in modelNotes.objects.filter(owner=modelUser.objects.get(login=login), open_for_all=False)]
            
            openNotes = [note.returnForTable() for note in modelNotes.objects.filter(open_for_all=True)]
            
            notes = [*openNotes, *userNotes]
            
            return CustomJsonResponse(result={'notes': notes})
        except:
            return CustomJsonResponse(status=400)
    
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
                        owner = modelUser.objects.get(login=request.user_data.get('userLogin'))
                            ).save()
            
            return CustomJsonResponse(message='Заметка успешно создана')
        except:
            return CustomJsonResponse(status=400)
    
    def postNoteGet(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            note = modelNotes.objects.get(link=body['noteLink']).returnOne()
            
            if (not isinstance(note.get('open_for_all'), bool)):
                raise
            
            if (not note.get('open_for_all') and request.user_data.get('userLogin') == None):
                return CustomJsonResponse(status=401)
            
            if (not note.get('open_for_all') and request.user_data.get('userLogin') != note['author']['login']):
                return CustomJsonResponse(status=403)
            
            return CustomJsonResponse(result={'note': note})
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator([decAuthRequired()])
    def post(self, request):
        try:
            action = json.loads(request.body).get('action')
            
            if (not action):
                raise
            
            if (action == 'noteCreate'):
                return self.postNoteCreate(request)
            elif (action == 'noteGet'):
                return self.postNoteGet(request)
            elif (action == 'getNoteList'):
                return self.postNoteList(request)
            else:
                raise
        except:
            return CustomJsonResponse(status=400)
    
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
            
            if (not note.get('edit_everyone') and request.user_data.get('userLogin') != ''):
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
    
    @method_decorator([decAuthRequired()])
    def delete(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            note = modelNotes.objects.get(id=body.get('noteId')).returnOne()
            
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