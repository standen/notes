import datetime

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
                
                userNotes = [note.returnForTable() for note in modelNotes.objects.filter(owner=modelUser.objects.get(login=login), is_open_for_all=False)]
                
                return CustomJsonResponse(result={'notes': userNotes})
            
            if (user_filter == 'all'):
                login = request.user_data.get('user_login')
                
                if not login:
                    return CustomJsonResponse(status=401)
                
                openNotes = []
                userNotes = []
                
                userNotes = [note.returnForTable() for note in modelNotes.objects.filter(owner=modelUser.objects.get(login=login), is_open_for_all=False)]
                openNotes = [note.returnForTable() for note in modelNotes.objects.filter(is_open_for_all=True)]
                
                notes = [*openNotes, *userNotes]
            
                return CustomJsonResponse(result={'notes': notes})
            
            if (user_filter == 'open'):
                openNotes = [note.returnForTable() for note in modelNotes.objects.filter(is_open_for_all=True)]
                return CustomJsonResponse(result={'notes': openNotes})
            
            raise
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении списка заметок произошла ошибка')
        
    @method_decorator([decValidateReq(f'{PATH_NOTES}/NotesLinksRequest.schema.json')])
    def getNotesLinks(self, request, **kwargs):
        try:
            notesLinks = [note.getNoteLink() for note in modelNotes.objects.all().order_by("name")]
            return CustomJsonResponse(result={'notes_links': notesLinks})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении списка заметок произошла ошибка')
        
    @method_decorator([decValidateReq(f'{PATH_NOTES}/NoteParamsRequest.schema.json')])
    def getNoteParams(self, request, **kwargs):
        try:
            noteId = kwargs.get('note_id')
            
            if noteId:
                note = modelNotes.objects.get(id=noteId)
            
            if not noteId:
                noteLink = kwargs.get('note_link')
                note = modelNotes.objects.get(link=noteLink)
            
            if (not note.is_open_for_all and not request.user_data.get('user_login')):
                return CustomJsonResponse(status=401)
            
            if (not note.is_open_for_all and request.user_data.get('user_login') != note.getOwner()):
                return CustomJsonResponse(status=403)
            
            return CustomJsonResponse(result={'note': note.returnOne()})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении списка заметок произошла ошибка')
    
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
        except Exception as e:
            return CustomJsonResponse(status=400, error=e)
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_NOTES}/NoteCreateRequest.schema.json')])
    def post(self, request, **kwargs):
        try:
            owner = request.user_data.get('user_login')
            
            modelNotes(
                **kwargs,
                owner = modelUser.objects.get(login=owner)
            ).save()
            
            return CustomJsonResponse(message='Заметка успешно создана')
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При попытке создать заметку произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_NOTES}/NoteEditRequest.schema.json')])
    def patch(self, request, **kwargs):
        try:
            owner = request.user_data.get('user_login')
            noteId = kwargs.get('note_id')
            noteParams = kwargs.get('params')
            
            note = modelNotes.objects.get(id=noteId)
            
            if (note.is_edit_everyone == False and owner != note.owner.login):
                return CustomJsonResponse(status=403)
            
            if (note.link != noteParams.get('link')):
                note.link = noteParams.get('link')
            note.name = noteParams.get('name')
            note.text = noteParams.get('text')
            note.is_cipher = noteParams.get('is_cipher')
            note.is_open_for_all = noteParams.get('is_open_for_all')
            note.is_edit_everyone = noteParams.get('is_edit_everyone')
            note.updated_at = datetime.datetime.now()
            
            note.save()
            
            return CustomJsonResponse(message='Заметка успешно изменена')  
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При попытке обновить параметры заметки произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_NOTES}/NoteDeleteRequest.schema.json')])
    def delete(self, request, **kwargs):
        try:
            note = modelNotes.objects.get(id=kwargs.get('note_id'))
            
            if (request.user_data.get('user_login') != note.owner.login):
                return CustomJsonResponse(status=403)
            
            modelNotesDeleted(name = note.name,
                    text = note.text,
                    link = note.link,
                    is_cipher = note.is_cipher,
                    is_open_for_all = note.is_open_for_all,
                    is_edit_everyone = note.is_edit_everyone,
                    owner = note.owner).save()
            note.delete()
            return CustomJsonResponse(message='Заметка успешно удалена')
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При попытке удалить заметку произошла ошибка')