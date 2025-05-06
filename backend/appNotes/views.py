import json
from django.http import JsonResponse

from appAuth.views import decoratorAuth

from .models import *

@decoratorAuth()
def viewNoteTest(request):
    # body = json.loads(request.body)
    text = modelNotesTest.objects.all()[0].text
    # for i in modelNotesTest.objects.all():
    #     print(i.text)
    # print(len(modelNotesTest.objects.all()))
    return JsonResponse({'text':text})