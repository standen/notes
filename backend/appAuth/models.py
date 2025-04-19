import uuid
from django.db import models

ALLOWED_ACTIONS = [
    'USER_ADD',
    'USER_EDIT',
    'USER_DELETE',
    'SESSIONS_DELETE'
]

class modelUserPermission(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    description = models.CharField(max_length=100, unique=True, blank=False)
    shortname = models.CharField(max_length=50, unique=True, blank=False)
    is_active = models.BooleanField(default=True)

class modelUserRole(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True, blank=False)
    allowed_actions = models.JSONField()
    is_active = models.BooleanField(default=True)

class modelUser(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    login = models.CharField(unique=True, max_length=50, blank=False)
    password = models.CharField(max_length=64, blank=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    role = models.ForeignKey(modelUserRole, on_delete=models.PROTECT)