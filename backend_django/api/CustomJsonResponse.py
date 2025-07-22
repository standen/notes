from django.http import JsonResponse

def textForStatusCode(statusCode):
    if (statusCode == 400):
        return 'Сервер не смог обработать запрос'
    elif (statusCode == 401):
        return 'Требуется авторизация'
    elif (statusCode == 403):
        return 'Недостаточно прав для выполнения операции'

class CustomJsonResponse(JsonResponse):
    def __init__(self, result = None, message = None, status=200, **kwargs):
        
        # not message - для кастомизации message при дефолтных status-кодах
        if (textForStatusCode(status) and not message):
            message = textForStatusCode(status)
            
        data = {
            'status': 'success' if status == 200 else 'error',
        }
        
        if message:
            data.update({'message': message})
            
        if result:
            data.update({'result': result})
            
        if (kwargs.get('userLogin') != None):
            data.update({'userLogin': kwargs.get('userLogin')})
            
        if (kwargs.get('userAllowedActions') != None):
            data.update({'userAllowedActions': kwargs.get('userAllowedActions')})
        
        super().__init__(data=data, status=status, json_dumps_params={'ensure_ascii':False})