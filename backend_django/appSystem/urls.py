from django.urls import path

from .views import viewManageSystem

urlpatterns = [
  path('', viewManageSystem.as_view())
]