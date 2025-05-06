import uuid
from django.db import models

from appAuth.models import modelUser

class modelNotes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    name = models.CharField()
    text = models.TextField()
    link = models.CharField(unique=True)
    is_cipher = models.BooleanField(default=False)
    open_for_all = models.BooleanField(default=False)
    edit_everyone = models.BooleanField(default=False)

    owner = models.ForeignKey(modelUser, on_delete=models.PROTECT)

class modelNotesTest(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.TextField()
