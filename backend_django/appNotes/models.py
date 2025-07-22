import uuid
from django.db import models
from django.utils import timezone

from appAuth.models import modelUser

tz = timezone.get_default_timezone()

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

    def returnOne(self):
        return {
            'id': self.id,
            'name': self.name,
            'text': self.text,
            'link': self.link,
            'is_cipher': self.is_cipher,
            'open_for_all': self.open_for_all,
            'edit_everyone': self.edit_everyone,
            'created_at': self.created_at.astimezone(tz).strftime('%d.%m.%Y %H:%M'),
            'updated_at': self.updated_at.astimezone(tz).strftime('%d.%m.%Y %H:%M'),
            'author': {
                'id': self.owner.id,
                'login': self.owner.login,
            }
        }
    
    def returnForTable(self):
        return {
            'id': self.id,
            'name': self.name,
            'link': self.link,
            'author': {
                'id': self.owner.id,
                'login': self.owner.login,
            }
        }
