import json, datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decRequiredBodyParams import decRequiredBodyParams

class viewManagePermissions(View):
    def get(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({'allowed_actions': ALLOWED_ACTIONS}, **kwargs)
        except:
            return CustomJsonResponse(status=400)

class viewManageRoles(View):
    def get(self, request, *args, **kwargs):
        try:
            roles = [role.returnOne() for role in modelUserRole.objects.filter(is_active=True).order_by("name")]
            return CustomJsonResponse(result={'roles': roles})
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['name', 'allowed_actions']))
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole(name=body['name'], allowed_actions={'list': body['allowed_actions']}).save()
            return CustomJsonResponse(message='Роль успешно создана')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['name', 'allowed_actions', 'roleId']))
    def patch(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole.objects.filter(is_active=True, id=body['roleId']).update(name=body['name'], allowed_actions={'list': body['allowed_actions']})
            return CustomJsonResponse(message='Роль успешно изменена')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['roleId']))
    def delete(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole.objects.filter(is_active=True, id=body['roleId']).update(is_active=False)
            return CustomJsonResponse(message='Роль успешно удалена')
        except:
            return CustomJsonResponse(status=400)
    
class viewManageUsers(View):
    def get(self, request, *args, **kwargs):
        try:
            users = [user.returnOne() for user in modelUser.objects.filter(is_active=True).order_by("login")]
            return CustomJsonResponse(result={'users': users})
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['login', 'password', 'roleId']))
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser(login=body['login'], password=['password'], role=modelUserRole.objects.get(id=body['roleId'])).save()
            return CustomJsonResponse(message='Пользователь успешно создан')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['login', 'password', 'roleId', 'userId']))
    def patch(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser.objects.filter(id=body['userId']).update(
                    login=body['login'], 
                    password=body['password'], 
                    role=modelUserRole.objects.get(id=body['roleId']),
                    updated_at = datetime.datetime.now()
                    )
            return CustomJsonResponse(message='Пользователь успешно изменен')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['userId']))
    def delete(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser.objects.filter(id=body['userId']).update(is_active=False)
            return CustomJsonResponse(message='Пользователь успешно удален')
        except:
            return CustomJsonResponse(status=400)