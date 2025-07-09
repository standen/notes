import json

from django.views import View
from django.http import JsonResponse
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decAllowedActions import decAllowedActions

from .models import *

class viewLogin(View):
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            login = body.get('login')
            password = body.get('password')
            
            if (not login or not password):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            user = modelUser.objects.get(login=login, password=password, is_active=True)
            
            s = SessionStore()
            s['login'] = user.login
            s.create()
            
            response = CustomJsonResponse(message='Авторизация прошла успешно')
            response.set_cookie(key='token', value=s.session_key, httponly=True, secure=True)
            return response
        except:
            return CustomJsonResponse(status=400)

def viewLogout(request):
    return JsonResponse({})

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


