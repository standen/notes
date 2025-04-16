from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
import json

from utils.crypto.hashSha256 import *

from .models import *

def some():
    return {
'json_dumps_params': {'ensure_ascii':False},
'status': 505
}
# jsonparams = 

def decoratorAuth(methods: list[str] = None, allowed_actions: list[str] = None):
    def decorator(func):
        @csrf_exempt
        def wrapper(request, *args, **kwargs):
            if (methods):
                if (not request.method in methods):
                    return JsonResponse({'status': 'error', 'result': None, 'message': 'Недопустимый тип запроса'}, **some())

            if (allowed_actions):
                try:
                    print(1)
                except:
                    print(2)

            return func(request, *args, **kwargs)
        return wrapper
    return decorator

@decoratorAuth(['POST'])
def viewLogin(request):
    body = json.loads(request.body)
    # print(dir(JsonResponse.charset = 'uft-8'))
    if (body.get('login') and body.get('password')):
        try:
            user = modelUser.objects.get(login=body.get('login'), password=body.get('password'))
            
            s = SessionStore()
            s['login'] = user.login
            s.create()

            response = JsonResponse({'status': 'success', 'result': None, 'message': 'Авторизация прошла успешно'}, safe=False, json_dumps_params={'ensure_ascii':False})
            response.set_cookie('token', s.session_key, httponly=True, secure=True, max_age=1209600)
            return response
        except:
            return JsonResponse({'status':'error', 'result': None, 'message': 'Ошибка во время авторизации'}, safe=False, json_dumps_params={'ensure_ascii':False}, status=401)
    
    else:
        return JsonResponse({'status':'error', 'result': None, 'message': 'Ошибка во время авторизации: неверные параметры запроса'}, safe=False, json_dumps_params={'ensure_ascii':False})

def viewLogout(request):
    return JsonResponse({})

def viewDeleteAllSessions(request):
    return JsonResponse({})

@decoratorAuth()
def viewTest(request):
    # response = JsonResponse.set_cookie()
    # createSession()

    # response.set_cookie(key='token', value='123', httponly=True, secure=True, max_age=800)
    # print(dir(response))

    # print(dir(request.session.keys()))

    # print(request.COOKIES.get('token'))
    # response.set_cookie()

    # showSession()
    # JsonResponse.set_cookie(key='token', value='111', httponly=True, secure=True, max_age=800)
    # respone.set_signed_cookie('token2', '123', httponly=True, secure=True, max_age=800)
    # print(request.get_signed_cookie('token2'))

    # flushSession()

    # addRole()
    # addUser()
    # print(modelUser.objects.get(login='admin').role.allowed_actions['allowed_actions'])
    # print(request.session)

    return JsonResponse({'name': 'Denis'})

def createSession():
    s = SessionStore()
    s['login'] = 'standen'
    s.create()

def flushSession():
    for i in Session.objects.all():
        SessionStore(session_key=i.session_key).flush()

def showSession():
    print(f'Всего сессий: {len( Session.objects.all())}')
    for i in Session.objects.all():
        print(i)
        print(SessionStore(session_key=i.session_key).get('login'))

def addRole():
    modelUserRole(name='Admin', allowed_actions={'allowed_actions': ALLOWED_ACTIONS}).save()
    print(f'Roles count: {len(modelUserRole.objects.all())}')

def addUser():
    modelUser(login='admin', password=getHashSha256('123'), role=modelUserRole.objects.get(name='Admin')).save()
    print(f'User count: {len(modelUser.objects.all())}')


