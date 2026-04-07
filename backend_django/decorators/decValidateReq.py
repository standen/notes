import json
from jsonschema import Draft202012Validator
from referencing import Registry, Resource

from api.CustomJsonResponse import CustomJsonResponse

from api.json_schemes.constants import PATH_SYSTEM, PATH_NOTES, PATH_ROLES, PATH_USERS

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
                with open(f'{PATH_SYSTEM}/Response.schema.json', 'r', encoding='utf-8') as file:
                    response = Resource.from_contents(json.load(file))
                
                with open(f'{PATH_SYSTEM}/PermissionsList.schema.json', 'r', encoding='utf-8') as file:
                    permissions = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_ROLES}/Role.schema.json', 'r', encoding='utf-8') as file:
                    role = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_USERS}/User.schema.json', 'r', encoding='utf-8') as file:
                    user = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_NOTES}/Note.schema.json', 'r', encoding='utf-8') as file:
                    note = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_NOTES}/NotesListFilterValues.schema.json', 'r', encoding='utf-8') as file:
                    noteFilters = Resource.from_contents(json.load(file))
                    
                with open(f'{PATH_NOTES}/NoteForTable.schema.json', 'r', encoding='utf-8') as file:
                    noteForTable = Resource.from_contents(json.load(file))
                    
                registry = Registry().with_resources([
                    ("../system/Response.schema.json", response),
                    ("../../system/Response.schema.json", response),
                    ("../system/PermissionsList.schema.json", permissions),
                    ("../../system/PermissionsList.schema.json", permissions),
                    ("./Note.schema.json", note),
                    ("./NotesListFilterValues.schema.json", noteFilters),
                    ("./NoteForTable.schema.json", noteForTable),
                    ("./Role.schema.json", role),
                    ("./User.schema.json", user)
                ])
                
                validator = Draft202012Validator(schema, registry=registry)
                validator.validate(body)
            except Exception as e:
                print(e)
                return CustomJsonResponse(status=400, message='Неверные параметры запроса')
            
            return func(request, *args, **kwargs, **body)
        return wrapper
    return decorator