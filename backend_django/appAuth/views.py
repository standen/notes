import json

from django.views import View
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.utils.decorators import method_decorator

from .models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decRequiredBodyParams import decRequiredBodyParams

class viewLogin(View):
    def get(self, request, *args, **kwargs):
        result = {'count': len( Session.objects.all())}
        
        for i in Session.objects.all():
            result.update({str(i): SessionStore(session_key=i.session_key).get('login')})
        return CustomJsonResponse(result=result)
    
    @method_decorator(decRequiredBodyParams(['login', 'password']))
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
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
            return CustomJsonResponse(status=400)

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
        
class viewUserInfo(View):
    def post(self, request, *args, **kwargs):
        return CustomJsonResponse()