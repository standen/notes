import json

from django.views import View
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore
from django.utils.decorators import method_decorator

from .models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decValidateReq import decValidateReq
from decorators.decAuthRequired import decAuthRequired

from api.json_schemes.constants import PATH_AUTH

class viewAuth(View):
    @method_decorator([decValidateReq(f'{PATH_AUTH}/AuthUserInfoRequest.schema.json')])
    def getUserinfo(self, request, **kwargs):
        try:
            result = {
                "user_login": request.user_data.get('user_login'),
                "user_allowed_actions": request.user_data.get('user_allowed_actions')
            }
            return CustomJsonResponse(result=result)
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении информации о пользователе возникла ошибка')
        
    def getUsersSessionsList(self, request, **kwargs):
        try:
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
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении списка активных сессий пользователей возникла ошибка')
        
    def get(self, request, **kwargs):
        try:
            action = request.GET.get('action')
            
            if (action == 'get_user_info'):
                return self.getUserinfo(request)
            elif (action == 'get_users_sessions_list'):
                return self.getUsersSessionsList(request)
            else:
                raise
        except Exception as e:
            return CustomJsonResponse(status=400, error=3, message='Неверные параметры запроса')
        
    @method_decorator([decValidateReq(f'{PATH_AUTH}/AuthLoginRequest.schema.json')])
    def postLogin(self, request, **kwargs):
        try:
            user = modelUser.objects.get(login=kwargs.get('login'), password=kwargs.get('password'))
            
            s = SessionStore()
            s['login'] = user.login
            s.create()
            
            response = CustomJsonResponse(message='Авторизация прошла успешно')
            response.set_cookie(key='token', value=s.session_key, httponly=True, secure=True)
            return response
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При попытке авторизации возникла ошибка')
        
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_AUTH}/AuthLogoutRequest.schema.json')])
    def postLogout(self, request, **kwargs):
        try:
            token = request.COOKIES.get('token')
            
            if (not token):
                raise
            
            SessionStore(session_key=token).flush()
            response = CustomJsonResponse(message='Сессия успешно завершена')
            response.delete_cookie(key='token')
            return response
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При попытке выйти из профиля возникла ошибка')  
    
    def post(self, request, **kwargs):
        try:
            action = json.loads(request.body).get('action')
            
            if (action == 'auth_login'):
                return self.postLogin(request)
            elif (action == 'auth_logout'):
                return self.postLogout(request)
            else:
                raise
        except Exception as e:
            print(e)
            return CustomJsonResponse(status=400, message='Неверные параметры запроса')