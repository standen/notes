import json, datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decAllowedActions import decAllowedActions

from utils.compareLists import compareLists

class viewManagePermissions(View):
    @method_decorator(decAllowedActions('ROLE_CREATE'))
    def get(self, request, *args, **kwargs):
        return CustomJsonResponse({'allowed_actions': ALLOWED_ACTIONS}, **kwargs)

class viewManageRoles(View):
    def get(self, request, *args, **kwargs):
        try:
            roles = [role.returnOne() for role in modelUserRole.objects.filter(is_active=True).order_by("name")]
            return CustomJsonResponse(result={'roles': roles})
        except:
            return CustomJsonResponse(status=400)
    
    def post(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            name = body.get('name')
            allowed_actions = body.get('allowed_actions')
            
            if (not name 
                or not allowed_actions 
                or len(allowed_actions) == 0
                or not compareLists(allowed_actions, ALLOWED_ACTIONS)
                ):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole(name=name, allowed_actions={'list': allowed_actions}).save()
            return CustomJsonResponse(message='Роль успешно создана')
        except:
            return CustomJsonResponse(status=400)
    
    def patch(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            roleId = body.get('roleId')
            name = body.get('name')
            allowed_actions = body.get('allowed_actions')
            
            if (not roleId
                or not name 
                or not allowed_actions 
                or len(allowed_actions) == 0
                or not compareLists(allowed_actions, ALLOWED_ACTIONS)
                ):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole.objects.filter(is_active=True, id=roleId).update(name=name, allowed_actions={'list': allowed_actions})
            return CustomJsonResponse(message='Роль успешно изменена')
        except:
            return CustomJsonResponse(status=400)
    
    def delete(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            roleId = body.get('roleId')
            
            if (not roleId):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole.objects.filter(is_active=True, id=roleId).update(is_active=False)
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
            body = json.loads(request.body)
            login = body.get('login')
            password = body.get('password')
            roleId = body.get('roleId')
            
            if (not login
                or not password 
                or not roleId):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser(login=login, password=password, role=modelUserRole.objects.get(id=roleId)).save()
            return CustomJsonResponse(message='Пользователь успешно создан')
        except:
            return CustomJsonResponse(status=400)
    
    def patch(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            login = body.get('login')
            password = body.get('password')
            roleId = body.get('roleId')
            userId = body.get('userId')
            
            if (not login
                or not password 
                or not roleId
                or not userId):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser.objects.filter(id=userId).update(
                    login=login, 
                    password=password, 
                    role=modelUserRole.objects.get(id=roleId),
                    updated_at = datetime.datetime.now()
                    )
            return CustomJsonResponse(message='Пользователь успешно изменен')
        except:
            return CustomJsonResponse(status=400)
    
    def delete(self, request, *args, **kwargs):
        try:
            body = json.loads(request.body)
            userId = body.get('userId')
            
            if (not userId):
                raise
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser.objects.filter(id=userId).update(is_active=False)
            return CustomJsonResponse(message='Пользователь успешно удален')
        except:
            return CustomJsonResponse(status=400)