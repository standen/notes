from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from api.CustomJsonResponse import CustomJsonResponse

from decorators.decAllowedActions import decAllowedActions

@method_decorator(csrf_exempt, name='dispatch')
class MyView(View):
    def get(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except:
            return CustomJsonResponse(status=400)
    
    def post(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except:
            return CustomJsonResponse(status=400)
    
    def patch(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except:
            return CustomJsonResponse(status=400)
    
    def delete(self, request, *args, **kwargs):
        try:
            return CustomJsonResponse({})
        except:
            return CustomJsonResponse(status=400)