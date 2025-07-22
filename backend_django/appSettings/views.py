import json, datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decAllowedActions import decAllowedActions

from utils.compareLists import compareLists
from utils.isValuesInRequestBody import isValuesInRequestBody

class viewManagePermissions(View):
    @method_decorator(decAllowedActions(['USER_UPDATE']))
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
    
    def post(self, request, *args, **kwargs):
        try:
            requiredBodyParams = ['name', 'allowed_actions']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body or not compareLists(body['allowed_actions'], ALLOWED_ACTIONS)):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole(name=body['name'], allowed_actions={'list': body['allowed_actions']}).save()
            return CustomJsonResponse(message='Роль успешно создана')
        except:
            return CustomJsonResponse(status=400)
    
    def patch(self, request, *args, **kwargs):
        try:
            requiredBodyParams = ['name', 'allowed_actions', 'roleId']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body or not compareLists(body['allowed_actions'], ALLOWED_ACTIONS)):
                raise
            
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole.objects.filter(is_active=True, id=body['roleId']).update(name=body['name'], allowed_actions={'list': body['allowed_actions']})
            return CustomJsonResponse(message='Роль успешно изменена')
        except:
            return CustomJsonResponse(status=400)
    
    def delete(self, request, *args, **kwargs):
        try:
            requiredBodyParams = ['roleId']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body):
                raise
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
    
    def post(self, request, *args, **kwargs):
        try:
            requiredBodyParams = ['login', 'password', 'roleId']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser(login=body['login'], password=['password'], role=modelUserRole.objects.get(id=body['roleId'])).save()
            return CustomJsonResponse(message='Пользователь успешно создан')
        except:
            return CustomJsonResponse(status=400)
    
    def patch(self, request, *args, **kwargs):
        try:
            requiredBodyParams = ['login', 'password', 'roleId', 'userId']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body):
                raise
            
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
    
    def delete(self, request, *args, **kwargs):
        try:
            requiredBodyParams = ['userId']
            body = isValuesInRequestBody(requiredBodyParams, json.loads(request.body))
            
            if (not body):
                raise
            
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser.objects.filter(id=body['userId']).update(is_active=False)
            return CustomJsonResponse(message='Пользователь успешно удален')
        except:
            return CustomJsonResponse(status=400)