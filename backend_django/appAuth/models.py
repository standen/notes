import uuid
from django.db import models

class modelUserRole(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)

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
    id = models.UUIDField(primary_key=True, default=uuid.uuid7, editable=False)
    
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