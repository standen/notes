import json

from api.CustomJsonResponse import CustomJsonResponse

from utils.isValuesInRequestBody import isValuesInRequestBody

def decRequiredBodyParams(requiredBody = None):
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            
            try:
                if (requiredBody != None and isinstance(requiredBody, list)):
                    if (not isValuesInRequestBody(requiredBody, json.loads(request.body))):
                        return CustomJsonResponse(status=400, message='Запрос не содержит необходимых данных')
            except:
                print('Ошибка обработки обязательных полей внутри body запроса')
            
            return func(request, *args, **kwargs)
        return wrapper
    return decorator