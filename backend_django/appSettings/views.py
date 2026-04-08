import datetime

from django.views import View
from django.utils.decorators import method_decorator

from appAuth.models import *

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decAuthRequired import decAuthRequired
from decorators.decValidateReq import decValidateReq

from api.json_schemes.constants import PATH_ROLES, PATH_USERS

class viewManageRoles(View):
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_ROLES}/SettingsRolesListRequest.schema.json')])
    def getRolesList(self, request, **kwargs):
        try:
            roles = [role.returnOne() for role in modelUserRole.objects.all().order_by("name")]
            return CustomJsonResponse(result={'roles': roles})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении списка ролей произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_ROLES}/SettingsRolesNamesListRequest.schema.json')])
    def getRolesNamesList(self, request, **kwargs):
        try: 
            rolesNames = [role.getRoleName() for role in modelUserRole.objects.all().order_by("name")]
            return CustomJsonResponse(result={'roles_names': rolesNames})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении списка наименований ролей произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_ROLES}/SettingsRoleParamsRequest.schema.json')])
    def getRoleParams(self, request, **kwargs):
        try:
            role = modelUserRole.objects.get(id=kwargs.get('role_id'))
            return CustomJsonResponse(result={'role_params': role.returnOne()})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении параметров роли произошла ошибка')
    
    def get(self, request, **kwargs):
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
        except Exception as e:
            return CustomJsonResponse(status=400, error=e, message='Неверные параметры запроса')
        
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_ROLES}/SettingsRoleCreateRequest.schema.json')])
    def post(self, request, **kwargs):
        try:
            modelUserRole(name=kwargs.get('name'), allowed_actions={'list': kwargs.get('allowed_actions')}).save()
            return CustomJsonResponse(message='Роль успешно создана')
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При создании роли произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_ROLES}/SettingsRoleEditRequest.schema.json')])
    def patch(self, request, **kwargs):
        try:
            modelUserRole.objects.filter(id=kwargs.get('role_id')).update(name=kwargs.get('name'), allowed_actions={'list': kwargs.get('allowed_actions')})
            return CustomJsonResponse(message='Роль успешно изменена')
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При обновлении параметров роли произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_ROLES}/SettingsRoleDeleteRequest.schema.json')])
    def delete(self, request, **kwargs):
        try:
            role = modelUserRole.objects.get(id=kwargs.get('role_id'))
            role.delete()
            return CustomJsonResponse(message='Роль успешно удалена')
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При удалении роли произошла ошибка')
    
class viewManageUsers(View):
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_USERS}/SettingsUsersListRequest.schema.json')])
    def getUsersList(self, request, **kwargs):
        try:
            users = [user.returnOne() for user in modelUser.objects.all().order_by("login")]
            return CustomJsonResponse(result={'users': users})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении списка пользователей произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_USERS}/SettingsUsersLoginsListRequest.schema.json')])
    def getUsersLoginsList(self, request, **kwargs):
        try:
            usersLogins = [user.getUserLogin() for user in modelUser.objects.all().order_by("login")]
            return CustomJsonResponse(result={'users_logins': usersLogins})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении списка логинов пользователей произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_USERS}/SettingsUserParamsRequest.schema.json')])
    def getUserParams(self, request, **kwargs):
        try:
            user = modelUser.objects.get(id=kwargs.get('user_id'))
            return CustomJsonResponse(result={'user_params': user.returnOne()})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При получении параметров пользователя произошла ошибка')
    
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
        except Exception as e:
            return CustomJsonResponse(status=400, error=e, message='Неверные параметры запроса')
        
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_USERS}/SettingsUserCreateRequest.schema.json')])
    def post(self, request, **kwargs):
        try:
            modelUser(login=kwargs.get('login'), password=kwargs.get('password'), role=modelUserRole.objects.get(id=kwargs.get('role_id'))).save()
            return CustomJsonResponse(message='Пользователь успешно создан')
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При создании пользователя произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_USERS}/SettingsUserEditRequest.schema.json')])
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
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При обновлении параметров пользователя произошла ошибка')
    
    @method_decorator([decAuthRequired(), decValidateReq(f'{PATH_USERS}/SettingsUserDeleteRequest.schema.json')])
    def delete(self, request, **kwargs):
        try:
            user = modelUser.objects.get(id=kwargs.get('user_id'))
            user.delete()
            return CustomJsonResponse(message='Пользователь успешно удален')
        except Exception as e:
            return CustomJsonResponse(status=500, error=e, message='При удалении пользователя произошла ошибка')