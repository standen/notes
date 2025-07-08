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
        
        if (textForStatusCode(status)):
            message = textForStatusCode(status)
            
        data = {
            'result': result,
            'status': 'success' if status == 200 else 'error',
            'message': message
        }
        
        data.update(**kwargs)
        
        super().__init__(data=data, status=status, json_dumps_params={'ensure_ascii':False})