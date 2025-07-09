import json, datetime

from utils.compareLists import compareLists


from appAuth.models import modelUser
from .models import *

def viewNotes(request):
    pass

# def viewNotes(request, **kwargs):
#     # получение списка заметок
#     if (request.method == 'GET'):
#         try:
#             notes = [note.returnForTable() for note in modelNotes.objects.filter(is_active=True).order_by("name")]
#             return JsonResponse(**defResponseParams(result={'notes': notes}, **kwargs))
#         except:
#             return invalidResponse
        
#     # общее для остальных методов
#     try:
#         body = json.loads(request.body)
#     except:
#         return invalidRequestParams
    
#     # проверяем, что все параметры есть в теле запроса
#     isCreateEditParamsValid = compareLists(['name', 'text', 'link', 'is_cipher', 'open_for_all', 'edit_everyone', 'userLogin'], body.keys())

#     # создание заметки, получение конкретной заметки
#     if (request.method == 'POST'):
#         try:
#             if (len(body.keys()) == 1 and compareLists(['noteLink'], body.keys())):
#                 try:
#                     note = modelNotes.objects.get(link=body.get('noteLink')).returnOne()
#                     return JsonResponse(**defResponseParams(result={'note': note}, **kwargs))
#                 except:
#                     return JsonResponse(**defResponseParams(message='Заметка не найдена', statusCode=404, **kwargs))
#             elif (isCreateEditParamsValid):
#                 modelNotes(name = body.get('name'),
#                            text = body.get('text'),
#                            link = body.get('link'),
#                            is_cipher = body.get('is_cipher'),
#                            open_for_all = body.get('open_for_all'),
#                            edit_everyone = body.get('edit_everyone'),
#                            owner = modelUser.objects.get(login=body.get('userLogin'))
#                             ).save()
#                 return JsonResponse(**defResponseParams(message='Заметка успешно создана', **kwargs))
#             else:
#                 return invalidRequestParams
#         except:
#             return invalidResponse

#     # изменение заметки
#     if (request.method == 'PATCH'):
#         try:
#             if (isCreateEditParamsValid):
#                 modelNotes.objects.filter(link=body.get('link')).update(
#                     name = body.get('name'),
#                     text = body.get('text'),
#                     link = body.get('link'),
#                     is_cipher = body.get('is_cipher'),
#                     open_for_all = body.get('open_for_all'),
#                     edit_everyone = body.get('edit_everyone'),
#                     owner = modelUser.objects.get(login=body.get('userLogin')),
#                     updated_at = datetime.datetime.now()
#                 )
#                 return JsonResponse(**defResponseParams(message='Заметка успешно обновлена', **kwargs))
#             else:
#                 return invalidRequestParams

#         except:
#             return invalidResponse

#     # удаление заметки
#     if (request.method == 'DELETE'):
#         try:
#             if (compareLists(['noteId'], body.keys())):
#                 modelNotes.objects.filter(id=body.get('noteId')).update(is_active=False)
#                 return JsonResponse(**defResponseParams(message='Заметка успешно удалена', **kwargs))
#             else:
#                 return invalidRequestParams
#         except:
#             return invalidResponse

#     return JsonResponse({'text':'text'})