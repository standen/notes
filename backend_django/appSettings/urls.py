from django.urls import path

from .views import viewManageRoles, viewManageUsers

urlpatterns = [
    path('/roles', viewManageRoles.as_view()),
    path('/users', viewManageUsers.as_view())
]