from django.urls import path

from .views import *

urlpatterns = [
    path('permissions', viewManagePermissions),
    path('roles', viewManageRoles),
    path('users', viewManageUsers)
]