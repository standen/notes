import json
from django.http import JsonResponse

from appAuth.views import decoratorAuth
from utils.compareLists import compareLists

from appAuth.views import invalidResponse, invalidRequestParams,defResponseParams

from .models import *

@decoratorAuth(['GET', 'POST', 'PATCH', 'DELETE'])
def viewNotes(request):
    # получение списка заметок
    if (request.method == 'GET'):
        try:
            notes = [note.returnOne() for note in modelNotes.objects.filter(is_active=True).order_by("name")]
            return JsonResponse(**defResponseParams(result={'notes': notes}))
        except:
            return invalidResponse

    # создание заметки, получение конкретной заметки
    if (request.method == 'POST'):
        try:
            body = json.loads(request.body)

        except:
            return invalidResponse

    # изменение заметки
    if (request.method == 'PATCH'):
        try:
            body = json.loads(request.body)

        except:
            return invalidResponse

    # удаление заметки
    if (request.method == 'DELETE'):
        try:
            body = json.loads(request.body)

            if (compareLists(['noteId'], body.keys())):
                modelNotes.objects.filter(id=body.get('noteId')).update(is_active=False)
                return JsonResponse(**defResponseParams(message='Заметка успешно удалена'))
            else:
                return invalidRequestParams
        except:
            return invalidResponse

    return JsonResponse({'text':'text'})