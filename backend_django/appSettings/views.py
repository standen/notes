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
        return CustomJsonResponse(result={'roles_names': rolesNames})
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/roles/SettingsRoleParamsRequest.json')])
    def getRoleParams(self, request, **kwargs):
        role = modelUserRole.objects.get(id=kwargs.get('role_id'))
        return CustomJsonResponse(result={'role_params': role.returnOne()})
    
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
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/users/SettingsUsersListRequest.json')])
    def getUsersList(self, request, **kwargs):
        users = [user.returnOne() for user in modelUser.objects.all().order_by("login")]
        return CustomJsonResponse(result={'users': users})
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/users/SettingsUsersLoginsListRequest.json')])
    def getUsersLoginsList(self, request, **kwargs):
        usersLogins = [user.getUserLogin() for user in modelUser.objects.all().order_by("login")]
        return CustomJsonResponse(result={'users_logins': usersLogins})
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/users/SettingsUserParamsRequest.json')])
    def getUserParams(self, request, **kwargs):
        user = modelUser.objects.get(id=kwargs.get('user_id'))
        return CustomJsonResponse(result={'user_params': user.returnOne()})
    
    def get(self, request, **kwargs):
        try:
            action = request.GET.get('action')
            
            if (action == 'get_users_list'):
                return self.getUsersList(request)
            elif (action == 'get_users_logins_list'):
                return self.getUsersLoginsList(request)
            elif (action == 'get_user_params'):
                return self.getUserParams(request)
            else:
                raise
        except:
            return CustomJsonResponse(status=400)
        
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/users/SettingsUserCreateRequest.json')])
    def post(self, request, **kwargs):
        try:
            modelUser(login=kwargs.get('login'), password=kwargs.get('password'), role=modelUserRole.objects.get(id=kwargs.get('role_id'))).save()
            return CustomJsonResponse(message='Пользователь успешно создан')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/users/SettingsUserEditRequest.json')])
    def patch(self, request, **kwargs):
        try:
            if (kwargs.get('password') == None):
                modelUser.objects.filter(id=kwargs.get('user_id')).update(
                    login=kwargs.get('login'), 
                    role=modelUserRole.objects.get(id=kwargs.get('role_id')),
                    updated_at = datetime.datetime.now()
                    )
            else:
                modelUser.objects.filter(id=kwargs.get('user_id')).update(
                    login=kwargs.get('login'), 
                    password=kwargs.get('password'), 
                    role=modelUserRole.objects.get(id=kwargs.get('role_id')),
                    updated_at = datetime.datetime.now()
                    )
            return CustomJsonResponse(message='Пользователь успешно изменен')
        except:
            return CustomJsonResponse(status=400)
    
    @method_decorator([decRequiredAuth(), decValidateReq('api/json_schemes/settings/users/SettingsUserDeleteRequest.json')])
    def delete(self, request, **kwargs):
        try:
            user = modelUser.objects.get(id=kwargs.get('user_id'))
            user.delete()
            return CustomJsonResponse(message='Пользователь успешно удален')
        except:
            return CustomJsonResponse(status=400)