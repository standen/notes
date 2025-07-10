import json

from django.views import View
from django.http import JsonResponse
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore

from .models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decAllowedActions import decAllowedActions

from utils.isValuesInRequestBody import isValuesInRequestBody

class viewLogin(View):
    def get(self, request, *args, **kwargs):
        result = {'count': len( Session.objects.all())}
        
        for i in Session.objects.all():
            result.update({str(i): SessionStore(session_key=i.session_key).get('login')})
        return CustomJsonResponse(result=result)
    
    def post(self, request, *args, **kwargs):
        try:
            requiredBodyParams = ['login', 'password']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            user = modelUser.objects.get(login=body['login'], password=body['password'], is_active=True)
            
            s = SessionStore()
            s['login'] = user.login
            s.create()
            
            response = CustomJsonResponse(message='Авторизация прошла успешно')
            response.set_cookie(key='token', value=s.session_key, httponly=True, secure=True)
            return response
        except:
            return CustomJsonResponse(status=400, message=1)

class viewLogout(View):
    def post(self, request, *args, **kwargs):
        try:
            token = request.COOKIES.get('token')
            
            if (not token):
                raise
            
            SessionStore(session_key=token).flush()
            response = CustomJsonResponse(message='Сессия успешно завершена')
            response.delete_cookie(key='token')
            return response
        except:
            return CustomJsonResponse(status=400)

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


