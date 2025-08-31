import json, datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decRequiredBodyParams import decRequiredBodyParams

class viewManagePermissions(View):
    def get(self, request):
        try:
            return CustomJsonResponse({'permissions': ALLOWED_ACTIONS})
        except:
            return CustomJsonResponse(status=400)

class viewManageRoles(View):
    def get(self, request):
        try:
            if (request.GET.get('filter') == 'rolesNames'):
                rolesNames = [role.getRoleName() for role in modelUserRole.objects.all().order_by("name")]
                return CustomJsonResponse(result={'rolesNames': rolesNames})
            
            roles = [role.returnOne() for role in modelUserRole.objects.all().order_by("name")]
            return CustomJsonResponse(result={'roles': roles})
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['name', 'allowed_actions']))
    def postRoleCreate(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole(name=body.get('name'), allowed_actions={'list': body.get('allowed_actions')}).save()
            return CustomJsonResponse(message='Роль успешно создана')
        except:
            return CustomJsonResponse(status=400)
        
    @method_decorator(decRequiredBodyParams(['roleId']))
    def postRoleGet(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            role = modelUserRole.objects.get(id=body.get('roleId'))
            return CustomJsonResponse(result={'roleParams': role.returnOne()})
        except:
            return CustomJsonResponse(status=400)
        
    @method_decorator(decRequiredBodyParams(['action']))
    def post(self, request):
        try:
            action = json.loads(request.body).get('action')
            
            if (not action):
                raise
            
            if (action == 'roleGet'):
                return self.postRoleGet(request)
            elif (action == 'roleCreate'):
                return self.postRoleCreate(request)
            else:
                raise
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['name', 'allowed_actions', 'roleId']))
    def patch(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole.objects.filter(id=body.get('roleId')).update(name=body.get('name'), allowed_actions={'list': body.get('allowed_actions')})
            return CustomJsonResponse(message='Роль успешно изменена')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['roleId']))
    def delete(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUserRole.objects.filter(id=body.get('roleId')).delete()
            return CustomJsonResponse(message='Роль успешно удалена')
        except:
            return CustomJsonResponse(status=400)
    
class viewManageUsers(View):
    def get(self, request):
        try:
            if (request.GET.get('filter') == 'logins'):
                usersLogins = [user.getUserLogin() for user in modelUser.objects.all().order_by("login")]
                return CustomJsonResponse(result={'usersLogins': usersLogins})
            
            users = [user.returnOne() for user in modelUser.objects.all().order_by("login")]
            return CustomJsonResponse(result={'users': users})
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['login', 'password', 'roleId']))
    def postUserCreate(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser(login=body['login'], password=['password'], role=modelUserRole.objects.get(id=body['roleId'])).save()
            return CustomJsonResponse(message='Пользователь успешно создан')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['userId']))
    def postUserGet(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            user = modelUser.objects.get(id=body.get('userId'))
            return CustomJsonResponse(result={'userParams': user.returnOne()})
        except:
            return CustomJsonResponse(status=400)
        
    @method_decorator(decRequiredBodyParams(['action']))
    def post(self, request):
        try:
            action = json.loads(request.body).get('action')
            
            if (not action):
                raise
            
            if (action == 'userGet'):
                return self.postUserGet(request)
            elif (action == 'userCreate'):
                return self.postUserCreate(request)
            else:
                raise
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['login', 'roleId', 'userId']))
    def patch(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            if (body.get('password') == None):
                modelUser.objects.filter(id=body.get('userId')).update(
                    login=body.get('login'), 
                    role=modelUserRole.objects.get(id=body.get('roleId')),
                    updated_at = datetime.datetime.now()
                    )
            else:
                modelUser.objects.filter(id=body.get('userId')).update(
                    login=body.get('login'), 
                    password=body.get('password'), 
                    role=modelUserRole.objects.get(id=body.get('roleId')),
                    updated_at = datetime.datetime.now()
                    )
            return CustomJsonResponse(message='Пользователь успешно изменен')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator(decRequiredBodyParams(['userId']))
    def delete(self, request):
        try:
            body = json.loads(request.body)
        except:
            return CustomJsonResponse(status=400)
        
        try:
            modelUser.objects.get(id=body.get('userId')).delete()
            return CustomJsonResponse(message='Пользователь успешно удален')
        except:
            return CustomJsonResponse(status=400)