import uuid
from django.db import models

ALLOWED_ACTIONS = [
    'USER_ADD',
    'USER_EDIT',
    'USER_DELETE',
    'SESSIONS_DELETE'
]

class modelUserRole(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True, blank=False)
    allowed_actions = models.JSONField()
    is_active = models.BooleanField(default=True)

    def returnOne(self):
        return {
            'id': self.id,
            'name': self.name,
            'allowed_actions': self.allowed_actions['allowed_actions']
        }

class modelUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    login = models.CharField(unique=True, max_length=50, blank=False)
    password = models.CharField(max_length=64, blank=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    role = models.ForeignKey(modelUserRole, on_delete=models.PROTECT)

    def returnOne(self):
        return {
            'id': self.id,
            'login': self.login,
            'role': self.role.name
        }