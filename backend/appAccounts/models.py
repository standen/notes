import uuid
from django.db import models

from appAuth.models import modelUser

class modelAccounts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    login = models.CharField(unique=True)
    cipher_login = models.BooleanField(default=False)
    password = models.CharField()
    another_secret = models.TextField()

    owner = models.ForeignKey(modelUser, on_delete=models.PROTECT)

class modelAccountsDeleted(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deleted_at = models.DateTimeField(auto_now_add=True)

    login = models.CharField()
    cipher_login = models.BooleanField(default=False)
    password = models.CharField()
    another_secret = models.TextField()

    owner = models.ForeignKey(modelUser, on_delete=models.PROTECT)
