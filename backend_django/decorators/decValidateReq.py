import json
from jsonschema import Draft202012Validator
from referencing import Registry, Resource

from api.CustomJsonResponse import CustomJsonResponse

from api.json_schemes.constants import PATH_COMMON

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
                with open(f'{PATH_COMMON}/PermissionList.schema.json', 'r', encoding='utf-8') as file:
                    permissions = Resource.from_contents(json.load(file))
                
                with open(f'{PATH_COMMON}/Role.schema.json', 'r', encoding='utf-8') as file:
                    role = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_COMMON}/User.schema.json', 'r', encoding='utf-8') as file:
                    user = Resource.from_contents(json.load(file))
                
                with open(f'{PATH_COMMON}/NotesListFilterValues.schema.json', 'r', encoding='utf-8') as file:
                    noteListFilterValues = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_COMMON}/NoteForTable.schema.json', 'r', encoding='utf-8') as file:
                    noteForTable = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_COMMON}/Note.schema.json', 'r', encoding='utf-8') as file:
                    note = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_COMMON}/UserPermissions.schema.json', 'r', encoding='utf-8') as file:
                    user_permissions = Resource.from_contents(json.load(file))
                    
                registry = Registry().with_resources([
                    ("PermissionList.schema.json", permissions),
                    ("../../common/PermissionList.schema.json", permissions),
                    ("Role.schema.json", role),
                    ("../../common/Role.schema.json", role),
                    ("User.schema.json", user),
                    ("../../common/User.schema.json", user),
                    ("../common/NotesListFilterValues.schema.json", noteListFilterValues),
                    ("../common/Note.schema.json", note),
                    ("../common/NoteForTable.schema.json", noteForTable),
                    ("../common/UserPermissions.schema.json", user_permissions)
                ])
                
                validator = Draft202012Validator(schema, registry=registry)
                validator.validate(body)
            except Exception as e:
                print(e)
                return CustomJsonResponse(status=400, message='Неверные параметры запроса')
            
            return func(request, *args, **kwargs, **body)
        return wrapper
    return decorator