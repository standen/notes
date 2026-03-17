import json
from jsonschema import validate

from api.CustomJsonResponse import CustomJsonResponse

def decValidateReq(schemaPath):
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            try:
                body = json.loads(request.body)
            except:
                return CustomJsonResponse(status=500, message='Ошибка при парсинге тела запроса')
            
            try:
                with open(schemaPath, 'r', encoding='utf-8') as file:
                    schema = json.load(file)
            except:
                print('По указанному пути json-схема отсутствует')
                return CustomJsonResponse(status=500, message='Ошибка при получении доступа к файлу json-схемы')
            
            try:
                validate(instance=body, schema=schema)
            except Exception as e:
                print(e)
                return CustomJsonResponse(status=400, message='Неверные параметры запроса')
            
            return func(request, *args, **kwargs, **body)
        return wrapper
    return decorator