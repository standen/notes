import json, datetime

from django.views import View
from django.http import JsonResponse

from appAuth.views import decoratorAuth
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from utils.compareLists import compareLists

from appAuth.models import *

from appAuth.views import defResponseParams, invalidRequestParams, invalidResponse
from appAuth.models import ALLOWED_ACTIONS

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decAllowedActions import decAllowedActions


class viewManagePermissions(View):
    def get(self, request, *args, **kwargs):
        return CustomJsonResponse({'allowed_actions': ALLOWED_ACTIONS}, **kwargs)

@method_decorator(csrf_exempt, name='dispatch')
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
        except:
            return CustomJsonResponse(status=400)
        
        try:
            return CustomJsonResponse({})
        except:
            return CustomJsonResponse(status=400)
    
    def patch(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except:
            return CustomJsonResponse(status=400)
    
    def delete(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except:
            return CustomJsonResponse(status=400)
    
class viewManageUsers(View):
    def get(self, request, *args, **kwargs):
        return CustomJsonResponse({})
    
    def post(self, request, *args, **kwargs):
        return CustomJsonResponse({})
    
    def patch(self, request, *args, **kwargs):
        return CustomJsonResponse({})
    
    def delete(self, request, *args, **kwargs):
        return CustomJsonResponse({})

@decoratorAuth(['GET', 'POST', 'PATCH', 'DELETE'])
def viewManageRoles2(request, **kwargs):
    # получение списка ролей
    if (request.method == 'GET'):
        try:
            roles = [role.returnOne() for role in modelUserRole.objects.filter(is_active=True).order_by("name")]
            return JsonResponse(**defResponseParams(result={'roles': roles}, **kwargs))
        except:
            return invalidResponse
        
    # общее для остальных методов
    try:
        body = json.loads(request.body)
    except:
        return invalidRequestParams

    # добавление роли
    if (request.method == 'POST'):
        try:
            if (compareLists(['name', 'allowed_actions'], body.keys()) 
                    and isinstance(body['allowed_actions'], list)
                    and len(body['allowed_actions']) > 0 
                    and compareLists(body['allowed_actions'], ALLOWED_ACTIONS)):
                modelUserRole(name=body.get('name'), allowed_actions={'allowed_actions': body.get('allowed_actions')}).save()
                return JsonResponse(**defResponseParams(message='Роль успешно создана', **kwargs))
            else:
                return invalidRequestParams
        except:
            return invalidResponse

    # изменение роли
    if (request.method == 'PATCH'):
        try:
            if (compareLists(['name', 'allowed_actions', 'roleId'], body.keys()) 
                    and isinstance(body['allowed_actions'], list)
                    and len(body['allowed_actions']) > 0 
                    and compareLists(body['allowed_actions'], ALLOWED_ACTIONS)):
                modelUserRole.objects.filter(id=body.get('roleId')).update(name=body.get('name'), allowed_actions={'allowed_actions': body.get('allowed_actions')})
                return JsonResponse(**defResponseParams(message='Роль успешно обновлена', **kwargs))
            else:
                return invalidRequestParams
        except:
            return invalidResponse
        
    # удаление роли
    if (request.method == 'DELETE'):
        try:
            if (compareLists(['roleId'], body.keys())):
                modelUserRole.objects.filter(id=body.get('roleId')).update(is_active=False)
                return JsonResponse(**defResponseParams(message='Роль успешно удалена', **kwargs))
            else:
                return invalidRequestParams
        except:
            return invalidResponse

@decoratorAuth(['GET', 'POST', 'PATCH', 'DELETE'], ['USER_EDIT'])
def viewManageUsers2(request, **kwargs):
    # получение списка пользователей
    if (request.method == 'GET'):
        try:
            users = [user.returnOne() for user in modelUser.objects.filter(is_active=True).order_by("login")]
            return JsonResponse(**defResponseParams(result={'users': users}, **kwargs))
        except:
            return invalidResponse
        
    # общее для остальных методов
    try:
        body = json.loads(request.body)
    except:
        return invalidRequestParams
        
    # добавление пользователя
    if (request.method == 'POST'):
        try:
            if (compareLists(['login', 'password', 'roleId'], body.keys())):
                modelUser(login=body.get('login'), password=body.get('password'), role=modelUserRole.objects.get(id=body.get('roleId'))).save()
                return JsonResponse(**defResponseParams(message='Пользователь успешно создан', **kwargs))
            else:
                return invalidRequestParams
        except:
            return invalidResponse
        
     # изменение пользователя
    if (request.method == 'PATCH'):
        try:
            if (compareLists(['login', 'password', 'roleId', 'userId'], body.keys())):
                modelUser.objects.filter(id=body.get('userId')).update(
                    login=body.get('login'), 
                    password=body.get('password'), 
                    role=modelUserRole.objects.get(id=body.get('roleId')),
                    updated_at = datetime.datetime.now()
                    )
                return JsonResponse(**defResponseParams(message='Пользователь успешно обновлен', **kwargs))
            else:
                return invalidRequestParams
        except:
            return invalidResponse
        
     # удаление роли
    if (request.method == 'DELETE'):
        try:
            if (compareLists(['userId'], body.keys())):
                modelUser.objects.filter(id=body.get('userId')).update(is_active=False)
                return JsonResponse(**defResponseParams(message='Пользователь успешно удален', **kwargs))
            else:
                return invalidRequestParams
        except:
            return invalidResponse