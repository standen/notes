from django.urls import path

from .views import viewManagePermissions, viewManageRoles, viewManageUsers

urlpatterns = [
    path('/permissions', viewManagePermissions.as_view()),
    path('/roles', viewManageRoles.as_view()),
    path('/users', viewManageUsers.as_view())
]