import json, datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decRequiredBodyParams import decRequiredBodyParams
from decorators.decRequiredAuth import decRequiredAuth
from decorators.decValidateReq import decValidateReq

class viewManagePermissions(View):
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/permissions/SettingsPermissionsRequest.json')])
    def get(self, request, **kwargs):
        try:
            return CustomJsonResponse({'permissions': ALLOWED_ACTIONS})
        except:
            return CustomJsonResponse(status=400)

class viewManageRoles(View):
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/roles/SettingsRolesListRequest.json')])
    def getRolesList(self, request, **kwargs):
        roles = [role.returnOne() for role in modelUserRole.objects.all().order_by("name")]
        return CustomJsonResponse(result={'roles': roles})
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/roles/SettingsRolesNamesListRequest.json')])
    def getRolesNamesList(self, request, **kwargs):
        rolesNames = [role.getRoleName() for role in modelUserRole.objects.all().order_by("name")]
        return CustomJsonResponse(result={'rolesNames': rolesNames})
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/roles/SettingsRoleParamsRequest.json')])
    def getRoleParams(self, request, **kwargs):
        role = modelUserRole.objects.get(id=kwargs.get('role_id'))
        return CustomJsonResponse(result={'roleParams': role.returnOne()})
    
    def get(self, request):
        try:
            action = request.GET.get('action')
            
            if (action == 'get_roles_list'):
                return self.getRolesList(request)
            elif (action == 'get_roles_names_list'):
                return self.getRolesNamesList(request)
            elif (action == 'get_role_params'):
                return self.getRoleParams(request)
            else:
                raise
        except:
            return CustomJsonResponse(status=400, message='Неверные параметры запроса')
        
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/roles/SettingsRolesCreateRequest.json')])
    def post(self, request, **kwargs):
        try:
            modelUserRole(name=kwargs.get('name'), allowed_actions={'list': kwargs.get('allowed_actions')}).save()
            return CustomJsonResponse(message='Роль успешно создана')
        except Exception as e:
            print(e)
            return CustomJsonResponse(status=400)
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/roles/SettingsRolesEditRequest.json')])
    def patch(self, request, **kwargs):
        try:
            modelUserRole.objects.filter(id=kwargs.get('role_id')).update(name=kwargs.get('name'), allowed_actions={'list': kwargs.get('allowed_actions')})
            return CustomJsonResponse(message='Роль успешно изменена')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/roles/SettingsRolesDeleteRequest.json')])
    def delete(self, request, **kwargs):
        try:
            role = modelUserRole.objects.get(id=kwargs.get('role_id'))
            role.delete()
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
            modelUser(login=body.get('login'), password=body.get('password'), role=modelUserRole.objects.get(id=body.get('roleId'))).save()
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