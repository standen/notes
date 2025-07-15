from django.contrib.sessions.backends.db import SessionStore

from appAuth.models import modelUser

def decUserInfo():
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            try:
                token = request.COOKIES.get('token')
                
                if (token == None):
                    raise
                
                s = SessionStore(session_key=token)
                login=s.get('login')
                
                if (login == None):
                    raise
                
                user_allowed_actions = modelUser.objects.get(login=login).getRolesList()
                
                if (not isinstance(user_allowed_actions, list)):
                    raise
            except:
                return func(request, *args, **kwargs)
            return func(request, *args, **kwargs, userLogin = login, userAllowedActions=user_allowed_actions)
        return wrapper
    return decorator