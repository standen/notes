from django.views.decorators.csrf import csrf_exempt
from django.contrib.sessions.backends.db import SessionStore

from api.CustomJsonResponse import CustomJsonResponse

from utils.compareLists import compareLists

from appAuth.models import modelUser

def decAllowedActions(allowedActions = None):
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            
            login = None
            try:
                token = request.COOKIES.get('token')
                if (allowedActions and not token):
                    return CustomJsonResponse(status=401)
                s = SessionStore(session_key=token)
            except:
                pass
            
            user_allowed_actions = None
            if login:
                pass
            
            return func(request, *args, **kwargs, userLogin = login, userAllowedActions=user_allowed_actions)
        return wrapper
    return decorator