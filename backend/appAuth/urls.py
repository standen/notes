from django.urls import path

from .views import viewLogin

urlpatterns = [
    path('/login', viewLogin.as_view()),
    # path('', viewTest),
    # path('logout', viewLogout),
    # path('reset', viewDeleteAllSessions)
]
