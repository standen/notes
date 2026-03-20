import json
from jsonschema import Draft202012Validator
from referencing import Registry, Resource

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
                # all refs resources
                with open('api/json_schemes/common/PermissionList.schema.json', 'r', encoding='utf-8') as file:
                    permissions = json.load(file)
                    
                registry = Registry().with_resources([(
                    "../../common/PermissionList.schema.json", Resource.from_contents(permissions)
                )])
                
                validator = Draft202012Validator(schema, registry=registry)
                validator.validate(body)
            except Exception as e:
                print(e)
                return CustomJsonResponse(status=400, message='Неверные параметры запроса')
            
            return func(request, *args, **kwargs, **body)
        return wrapper
    return decorator