from django.urls import path

from .views import *

urlpatterns = [
    path('', viewNotes.as_view())
]