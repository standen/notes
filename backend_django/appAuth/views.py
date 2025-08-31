import json

from django.views import View
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.utils.decorators import method_decorator

from .models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decRequiredBodyParams import decRequiredBodyParams
from decorators.decUserInfo import decUserInfo

class viewLogin(View):
    def get(self, request):
        result = {}    
        sessions = []
        for i in Session.objects.all():
            if (SessionStore(session_key=i.session_key).get('login') != None):
                sessions.append({'login': SessionStore(session_key=i.session_key).get('login'), 'session_key': str(i)})
            else:
                SessionStore(session_key=i.session_key).flush()
                
        result.update({'sessions': sessions})
        result.update({'count': len(sessions)})
        return CustomJsonResponse(result=result)
    
    @method_decorator(decRequiredBodyParams(['login', 'password']))
    def post(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            user = modelUser.objects.get(login=body.get('login'), password=body.get('password'))
            
            s = SessionStore()
            s['login'] = user.login
            s.create()
            
            response = CustomJsonResponse(message='Авторизация прошла успешно')
            response.set_cookie(key='token', value=s.session_key, httponly=True, secure=True)
            return response
        except:
            return CustomJsonResponse(status=400)

class viewLogout(View):
    def post(self, request):
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
        
class viewUserInfo(View):
    @method_decorator(decUserInfo())
    def post(self, request, **kwargs):
        return CustomJsonResponse(**request.user_data)