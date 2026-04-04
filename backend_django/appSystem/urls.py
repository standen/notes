from django.urls import path

from .views import viewManageSystem

utlpatterns = [
  path('/system', viewManageSystem.as_view())
]