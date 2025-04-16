from django.urls import path

from .views import *

urlpatterns = [
    path('', viewTest),
    path('login', viewLogin),
    path('logout', viewLogout),
    path('reset', viewDeleteAllSessions)
]
