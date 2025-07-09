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
                login=s['login']
            except:
                pass
            
            user_allowed_actions = None
            if login:
                try:
                    user_allowed_actions = modelUser.objects.get(login=login).getRolesList()
                except:
                    pass
            
            if (not compareLists(allowedActions, user_allowed_actions)):
                return CustomJsonResponse(status=403)
            
            return func(request, *args, **kwargs, userLogin = login, userAllowedActions=user_allowed_actions)
        return wrapper
    return decorator