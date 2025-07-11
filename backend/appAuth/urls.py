from django.urls import path

from .views import viewLogin, viewLogout, viewUserInfo

urlpatterns = [
    path('/login', viewLogin.as_view()),
    path('/logout', viewLogout.as_view()),
    path('/userinfo', viewUserInfo.as_view())
]
