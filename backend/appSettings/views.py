import json
from django.http import JsonResponse
import time

from appAuth.views import decoratorAuth

from utils.compareLists import compareLists

from appAuth.models import *

from appAuth.views import defSetStatusCode, invalidRequestParams, invalidResponse
from appAuth.models import ALLOWED_ACTIONS

@decoratorAuth(['GET'])
def viewManagePermissions(request):
    time.sleep(5)
    return JsonResponse({'status': 'success', 'result': {'allowed_actions': ALLOWED_ACTIONS}, 'message': None}, **defSetStatusCode(200))

@decoratorAuth(['GET', 'POST', 'PATCH'])
def viewManageRoles(request):
    # получение списка ролей
    if (request.method == 'GET'):
        try:
            roles = [role.returnOne() for role in modelUserRole.objects.all()]
            return JsonResponse({'status': 'success', 'result': {'roles': roles}, 'message': None}, **defSetStatusCode(200))
        except:
            return invalidResponse

    # добавление роли
    if (request.method == 'POST'):
        try:
            body = json.loads(request.body)

            if (compareLists(['name', 'allowed_actions'], body.keys()) 
                    and isinstance(body['allowed_actions'], list)
                    and len(body['allowed_actions']) > 0 
                    and compareLists(body['allowed_actions'], ALLOWED_ACTIONS)):
                modelUserRole(name=body.get('name'), allowed_actions={'allowed_actions': body.get('allowed_actions')}).save()
                return JsonResponse({'status': 'success', 'result': None, 'message': 'Роль успешно создана'}, **defSetStatusCode(200))
            else:
                return invalidRequestParams
        except:
            return invalidResponse

    # изменение роли
    if (request.method == 'PATCH'):
        try:
            body = json.loads(request.body)

            if (compareLists(['name', 'allowed_actions', 'roleId'], body.keys()) 
                    and isinstance(body['allowed_actions'], list)
                    and len(body['allowed_actions']) > 0 
                    and compareLists(body['allowed_actions'], ALLOWED_ACTIONS)):
                modelUserRole.objects.filter(id=body.get('roleId')).update(name=body.get('name'), allowed_actions={'allowed_actions': body.get('allowed_actions')})
                return JsonResponse({'status': 'success', 'result': None, 'message': 'Роль успешно обновлена'}, **defSetStatusCode(200))
            else:
                return invalidRequestParams
        except:
            return invalidResponse

@decoratorAuth(['GET', 'POST', 'PATCH'])
def viewManageUsers(request):
    # получение списка пользователей
    if (request.method == 'GET'):
        try:
            users = [user.returnOne() for user in modelUser.objects.all()]
            return JsonResponse({'status': 'success', 'result': {'users': users}, 'message': None}, **defSetStatusCode(200))
        except:
            return invalidResponse
        
    # добавление пользователя
    if (request.method == 'POST'):
        try:
            body = json.loads(request.body)

            if (compareLists(['login', 'password', 'roleId'], body.keys())):
                modelUser(login=body.get('login'), password=body.get('password'), role=modelUserRole.objects.get(id=body.get('roleId'))).save()
                return JsonResponse({'status': 'success', 'result': None, 'message': 'Пользователь успешно создан'}, **defSetStatusCode(200))
            else:
                return invalidRequestParams
        except:
            return invalidResponse
        
     # изменение пользователя
    if (request.method == 'PATCH'):
        try:
            body = json.loads(request.body)

            if (compareLists(['login', 'password', 'roleId', 'userId'], body.keys())):
                modelUser.objects.filter(id=body.get('userId')).update(login=body.get('login'), password=body.get('password'), role=modelUserRole.objects.get(id=body.get('roleId')))
                return JsonResponse({'status': 'success', 'result': None, 'message': 'Пользователь успешно обновлен'}, **defSetStatusCode(200))
            else:
                return invalidRequestParams
        except:
            return invalidResponse