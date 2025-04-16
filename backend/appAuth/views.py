from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
import json

from utils.crypto.hashSha256 import *

from .models import *

def decoratorAuth(methods: list[str] = None, allowed_actions: list[str] = None):
    def decorator(func):
        @csrf_exempt
        def wrapper(request, *args, **kwargs):
            if (methods):
                if (not request.method in methods):
                    return JsonResponse({"status": "error", "result": None, "message": "Недопустимый тип запроса"})
            return func(request, *args, **kwargs)
        return wrapper
    return decorator

@decoratorAuth()
def viewTest(request):
    respone = JsonResponse({})
    # createSession()

    # showSession()
    # respone.set_cookie(key='token', value='123', httponly=True, secure=True, max_age=800)
    # respone.set_signed_cookie('token2', '123', httponly=True, secure=True, max_age=800)
    print(request.get_signed_cookie('token2'))

    # flushSession()

    # addRole()
    # addUser()
    # print(modelUser.objects.get(login='admin').role.allowed_actions['allowed_actions'])
    print(request.session)

    return respone

def createSession():
    s = SessionStore()
    s['login'] = 'standen'
    s.create()

def flushSession():
    for i in Session.objects.all():
        SessionStore(session_key=i.session_key).flush()

def showSession():
    print(f"Всего сессий: {len( Session.objects.all())}")
    for i in Session.objects.all():
        print(i)
        print(SessionStore(session_key=i.session_key).get('login'))

def addRole():
    modelUserRole(name='Admin', allowed_actions={'allowed_actions': ALLOWED_ACTIONS}).save()
    print(f"Roles count: {len(modelUserRole.objects.all())}")

def addUser():
    modelUser(login='admin', password=getHashSha256('123'), role=modelUserRole.objects.get(name="Admin")).save()
    print(f"User count: {len(modelUser.objects.all())}")

@decoratorAuth(["POST"])
def viewLogin(request):
    body = json.loads(request.body)
    print(body)
    if (body.get('login') and body.get('password')):
        print('login ok')
        print(modelUser.objects.get(login='admin').password)
    return JsonResponse({})

def viewLogout(request):
    return JsonResponse({})

def viewDeleteAllSessions(request):
    return JsonResponse({})
