from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from api.CustomJsonResponse import CustomJsonResponse

@method_decorator(csrf_exempt, name='dispatch')
class MyView(View):
    def get(self, request, *args, **kwargs):
        # Обработка GET-запроса
        return CustomJsonResponse(result={"method": "get"}, status=200)
    def post(self, request, *args, **kwargs):
        # Обработка POST-запроса
        return JsonResponse({"method": "POST"})

    def update(self, request, *args, **kwargs):
        # Обработка PUT-запроса (можно эмулировать через POST + заголовок)
        return JsonResponse({"method": "PUT"})

    def delete(self, request, *args, **kwargs):
        # Обработка DELETE-запроса
        return JsonResponse({"method": "DELETE"})