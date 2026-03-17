import json
import os
from jsonschema import validate, RefResolver

from api.CustomJsonResponse import CustomJsonResponse

def decValidateReq(schemaPath):
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            try:
                if (request.method == 'GET'):
                    body = request.GET.dict()
                else:
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
                path = "/home/user/Desktop/PermissionList.json"
                base_uri = f"file://{path}"
                print(base_uri)
                resolver = RefResolver(base_uri=base_uri, referrer=schema)
                validate(instance=body, schema=schema, resolver=resolver)
            except Exception as e:
                print(e)
                return CustomJsonResponse(status=400, message='Неверные параметры запроса')
            
            return func(request, *args, **kwargs, **body)
        return wrapper
    return decorator