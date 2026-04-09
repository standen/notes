from django.apps import AppConfig

class AppauthConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'appAuth'
    
    # если проект впервые создан, автоматически создаем роль и пользователя
    def ready(self):
        import json
        
        from .models import modelUser, modelUserRole
        from api.json_schemes.constants import PATH_SYSTEM
        
        try:
            if (modelUser.objects.count() == 0 and modelUserRole.objects.count() == 0):
                with open(f'{PATH_SYSTEM}/PermissionsList.json', 'r', encoding='utf-8') as file:
                    permissions = json.load(file)
                
                modelUserRole(name='admin', allowed_actions={'list': permissions.get('permissions_list')}).save()
                
                role = modelUserRole.objects.get(name='admin')
                modelUser(
                    login='admin',
                    password = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
                    role=role
                ).save()
        except Exception as e:
            print(e)