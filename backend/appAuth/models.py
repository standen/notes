import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

ALLOWED_ACTIONS = [
    'USER_CREATE',
    'USER_UPDATE',
    'USER_DELETE',
    'ROLE_CREATE',
    'ROLE_UPDATE',
    'ROLE_DELETE'
]

class modelUserRole(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)

    name = models.CharField(max_length=50, unique=True)
    allowed_actions = ArrayField(models.CharField(max_length=50, unique=True))
    
    def returnOne(self):
        return {
            'id': self.id,
            'name': self.name,
            'allowed_actions': self.allowed_actions,
        }

class modelUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    login = models.CharField(unique=True, max_length=50)
    password = models.CharField()

    role = models.ForeignKey(modelUserRole, on_delete=models.PROTECT)

    def returnOne(self):
        return {
            'id': self.id,
            'login': self.login,
            'role': {
                'id': self.role.id,
                'name': self.role.name,
            }
        }