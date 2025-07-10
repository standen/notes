from django.urls import path

from .views import viewLogin, viewLogout

urlpatterns = [
    path('/login', viewLogin.as_view()),
    path('/logout', viewLogout.as_view()),
]
