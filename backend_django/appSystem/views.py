from django.views import View
from django.utils.decorators import method_decorator

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decValidateReq import decValidateReq

from api.json_schemes.constants import PATH_SYSTEM

class viewManageSystem(View):
  def get(self, request, **kwargs):
    try:
      action = request.GET.get('action')
      
      if (action == 'get_permissions_list'):
        return self.getRolesList(request)
      elif (action == 'get_system_permissions'):
        return self.getRolesNamesList(request)
      else:
        raise
    except:
      return CustomJsonResponse(status=400, message='Неверные параметры запроса')