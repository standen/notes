from django.views import View
from django.utils.decorators import method_decorator

from api.CustomJsonResponse import CustomJsonResponse
from decorators.decValidateReq import decValidateReq

from api.json_schemes.constants import PATH_SYSTEM

from .system_vars import ALLOWED_ACTIONS, SYSTEM_MENU, SYSTEM_PERMISSIONS

class viewManageSystem(View):
  @method_decorator([decValidateReq(f'{PATH_SYSTEM}/SystemPermissionsListRequest.schema.json')])
  def getSystemPermissionsList(self, request, **kwargs):
    try:
      return CustomJsonResponse({'permissions': ALLOWED_ACTIONS})
    except:
      return CustomJsonResponse(status=500, message='При получении перечня разрешений произошла ошибка')
    
  @method_decorator([decValidateReq(f'{PATH_SYSTEM}/SystemPermissionsRequest.schema.json')])
  def getSystemPermissions(self, request, **kwargs):
    try:
      return CustomJsonResponse({'system_permissions': SYSTEM_PERMISSIONS})
    except:
      return CustomJsonResponse(status=500, message='При получении перечня разрешений произошла ошибка')
    
  @method_decorator([decValidateReq(f'{PATH_SYSTEM}/SystemMenuRequest.schema.json')])
  def getSystemMenu(self, request, **kwargs):
    try:
      return CustomJsonResponse({'system_menu': SYSTEM_MENU})
    except:
      return CustomJsonResponse(status=500, message='При получении перечня разрешений произошла ошибка')
          
  def get(self, request, **kwargs):
    try:
      action = request.GET.get('action')
      
      if (action == 'get_system_permissions_list'):
        return self.getSystemPermissionsList(request)
      elif (action == 'get_system_permissions'):
        return self.getSystemPermissions(request)
      elif (action == 'get_system_menu'):
        return self.getSystemMenu(request)
      else:
        raise
    except:
      return CustomJsonResponse(status=400, message='Неверные параметры запроса')