from django.contrib.sessions.backends.db import SessionStore

from appAuth.models import modelUser

class MiddlewareAuth:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        self.get_user_info(request)
        response = self.get_response(request)
        return response
    
    def get_user_info(self, request):
        
        try:
            token = request.COOKIES.get('token')
            
            if (token == None):
                    raise
                
            s = SessionStore(session_key=token)
            login=s.get('login')
                
            if (login == None):
                raise
            
            user_allowed_actions = modelUser.objects.get(login=login).getRolesList()
            
        except:
            pass
        
        request.user_data = {'userLogin': login, 'userAllowedActions': user_allowed_actions}