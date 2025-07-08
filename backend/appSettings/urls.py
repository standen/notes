from django.urls import path

from .views import viewManagePermissions

urlpatterns = [
    path('/permissions', viewManagePermissions.as_view()),
    # path('roles', viewManageRoles),
    # path('users', viewManageUsers)
]