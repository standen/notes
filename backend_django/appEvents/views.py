from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from api.CustomJsonResponse import CustomJsonResponse

class MyView(View):
    def get(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e)
    
    def post(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e)
    
    def patch(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e)
    
    def delete(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except Exception as e:
            return CustomJsonResponse(status=500, error=e)