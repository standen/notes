import json, datetime
from django.http import JsonResponse

from appAuth.views import decoratorAuth

from utils.compareLists import compareLists

from appAuth.models import *

from appAuth.views import defResponseParams, invalidRequestParams, invalidResponse
from appAuth.models import ALLOWED_ACTIONS

@decoratorAuth(['GET'])
def viewManagePermissions(request):
    return JsonResponse(**defResponseParams(result={'allowed_actions': ALLOWED_ACTIONS}))

@decoratorAuth(['GET', 'POST', 'PATCH', 'DELETE'])
def viewManageRoles(request):
    # получение списка ролей
    if (request.method == 'GET'):
        try:
            roles = [role.returnOne() for role in modelUserRole.objects.filter(is_active=True).order_by("name")]
            return JsonResponse(**defResponseParams(result={'roles': roles}))
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
                return JsonResponse(**defResponseParams(message='Роль успешно создана'))
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
                return JsonResponse(**defResponseParams(message='Роль успешно обновлена'))
            else:
                return invalidRequestParams
        except:
            return invalidResponse
        
    # удаление роли
    if (request.method == 'DELETE'):
        try:
            if (compareLists(['roleId'], body.keys())):
                modelUserRole.objects.filter(id=body.get('roleId')).update(is_active=False)
                return JsonResponse(**defResponseParams(message='Роль успешно удалена'))
            else:
                return invalidRequestParams
        except:
            return invalidResponse

@decoratorAuth(['GET', 'POST', 'PATCH', 'DELETE'])
def viewManageUsers(request):
    # получение списка пользователей
    if (request.method == 'GET'):
        try:
            users = [user.returnOne() for user in modelUser.objects.filter(is_active=True).order_by("login")]
            return JsonResponse(**defResponseParams(result={'users': users}))
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
                return JsonResponse(**defResponseParams(message='Пользователь успешно создан'))
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
                return JsonResponse(**defResponseParams(message='Пользователь успешно обновлен'))
            else:
                return invalidRequestParams
        except:
            return invalidResponse
        
     # удаление роли
    if (request.method == 'DELETE'):
        try:
            if (compareLists(['userId'], body.keys())):
                modelUser.objects.filter(id=body.get('userId')).update(is_active=False)
                return JsonResponse(**defResponseParams(message='Пользователь успешно удален'))
            else:
                return invalidRequestParams
        except:
            return invalidResponse