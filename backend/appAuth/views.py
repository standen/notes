import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.sessions.models import Session
from django.contrib.sessions.backends.db import SessionStore

from utils.crypto.hashSha256 import *
from utils.compareLists import compareLists

from .models import *

def defResponseParams(message = None, result = None, statusCode = 200):
    return {'data': {'status': 'success' if statusCode == 200 else 'error', 'result' : result, 'message': message}, 
            'json_dumps_params': {'ensure_ascii':False}, 'status': statusCode}

invalidRequestParams = JsonResponse(**defResponseParams(message='Неверные параметры запроса', statusCode=400))
invalidResponse = JsonResponse(**defResponseParams(message='Сервер не смог обработать запрос', statusCode=400))
invalidRequestNoAccess = JsonResponse(**defResponseParams(message='Недостаточно прав для выполнения операции', statusCode=403))

invalidRequestNoUser = JsonResponse(**defResponseParams(message='Пользователь не существует', statusCode=400))
invalidRequestWrongPassword = JsonResponse(**defResponseParams(message='Неверный пароль', statusCode=400))

def decoratorAuth(methods: list[str] = None, allowed_actions: list[str] = None):
    def decorator(func):
        @csrf_exempt
        def wrapper(request, *args, **kwargs):
            if (methods):
                if (not request.method in methods):
                    return JsonResponse(**defResponseParams(message='Недопустимый тип запроса', statusCode=405))

            if (allowed_actions):
                try:
                    print(1)
                except:
                    print(2)

            return func(request, *args, **kwargs)
        return wrapper
    return decorator


@decoratorAuth(['POST'])
def viewLogin(request):
    try:
        body = json.loads(request.body)

        if (compareLists(['login', 'password'], body.keys())):
            try:
                user = modelUser.objects.get(login=body.get('login'), password=body.get('password'))
            
                s = SessionStore()
                s['login'] = user.login
                s.create()

                response = JsonResponse(**defResponseParams(message='Авторизация прошла успешно'))
                response.set_cookie(key='token', value=s.session_key, httponly=True, secure=True, max_age=1209600)
                print(dir(response))
                print(response.cookies)
                return response
            except:
                return invalidRequestNoUser
        else:
            return invalidRequestParams
    except:
        return invalidResponse

@decoratorAuth(['POST'])
def viewLogout(request):
    return JsonResponse({})

def viewDeleteAllSessions(request):
    return JsonResponse({})

@decoratorAuth()
def viewTest(request):
    # response = JsonResponse.set_cookie()
    # createSession()

    # response.set_cookie(key='token', value='123', httponly=True, secure=True, max_age=800)
    # print(dir(response))

    # print(dir(request.session.keys()))

    # print(request.COOKIES.get('token'))
    # response.set_cookie()

    # showSession()
    # JsonResponse.set_cookie(key='token', value='111', httponly=True, secure=True, max_age=800)
    # respone.set_signed_cookie('token2', '123', httponly=True, secure=True, max_age=800)
    # print(request.get_signed_cookie('token2'))

    # flushSession()

    # addRole()
    # addUser()
    # print(modelUser.objects.get(login='admin').role.allowed_actions['allowed_actions'])
    # print(request.session)

    return JsonResponse({'name': 'Denis'})

def createSession():
    s = SessionStore()
    s['login'] = 'standen'
    s.create()

def flushSession():
    for i in Session.objects.all():
        SessionStore(session_key=i.session_key).flush()

def showSession():
    print(f'Всего сессий: {len( Session.objects.all())}')
    for i in Session.objects.all():
        print(i)
        print(SessionStore(session_key=i.session_key).get('login'))

def addRole():
    modelUserRole(name='Admin', allowed_actions={'allowed_actions': ALLOWED_ACTIONS}).save()
    print(f'Roles count: {len(modelUserRole.objects.all())}')

def addUser():
    modelUser(login='admin', password=getHashSha256('123'), role=modelUserRole.objects.get(name='Admin')).save()
    print(f'User count: {len(modelUser.objects.all())}')


