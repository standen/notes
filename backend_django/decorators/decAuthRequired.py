from api.CustomJsonResponse import CustomJsonResponse

def decAuthRequired():
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            
            try:
                if (request.user_data.get('user_login') == None):
                    return CustomJsonResponse(status=401)
            except:
                print('Ошибка работы декоратора, который проверяет наличии авторизации у пользователя')
            
            return func(request, *args, **kwargs)
        return wrapper
    return decorator