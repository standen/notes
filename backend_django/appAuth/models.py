import uuid
from django.db import models

ALLOWED_ACTIONS = sorted([
    'USER_CREATE',
    'USER_UPDATE',
    'USER_DELETE',
    'ROLE_CREATE',
    'ROLE_UPDATE',
    'ROLE_DELETE',
    'NOTE_DELETE',
    'NOTE_CREATE',
    'NOTE_READ',
    'LOGIN_CREATE',
    'LOGIN_READ',
    'LOGIN_DELETE',
    'BIRTHDAY_CREATE',
    'BIRTHDAY_READ',
    'BIRTHDAY_DELETE',
    'SETTINGS_ACCESS',
    'SETTINGS_GLOBALS_ACCESS',
    'SETTINGS_USERS_ACCESS'
    'SETTINGS_ROLES_ACCESS'
])

class modelUserRole(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(max_length=50, unique=True)
    allowed_actions = models.JSONField()
    
    def returnOne(self):
        return {
            'id': self.id,
            'name': self.name,
            'allowed_actions': self.allowed_actions['list'],
        }
    
    def getRoleName(self):
        return self.name.lower()

class modelUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    login = models.CharField(unique=True, max_length=50)
    password = models.CharField()

    role = models.ForeignKey(modelUserRole, on_delete=models.DO_NOTHING)

    def returnOne(self):
        return {
            'id': self.id,
            'login': self.login,
            'role': {
                'id': self.role.id,
                'name': self.role.name,
            }
        }
    
    def getRolesList(self):
        return self.role.allowed_actions['list']
    
    def getUserLogin(self):
        return self.login.lower()