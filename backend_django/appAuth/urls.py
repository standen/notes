from django.urls import path

from .views import viewAuth

urlpatterns = [
    path('', viewAuth.as_view())
]
