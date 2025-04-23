import uuid
from django.db import models

from appAuth.models import modelUser

class modelDates(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    note = models.CharField(unique=True)
    date = models.DateField()

    owner = models.ForeignKey(modelUser, on_delete=models.PROTECT)

class modelDatesDeleted(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    deleted_at = models.DateTimeField(auto_now_add=True)
    
    note = models.CharField(unique=True)
    date = models.DateField()

    owner = models.ForeignKey(modelUser, on_delete=models.PROTECT)
    