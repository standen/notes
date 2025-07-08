def decRequestMethods(methods):
    def decorator(func):
        def wrapper(request, *args, **kwargs):
            if (not request.method in methods):
                print('405')
            return func(request, *args, **kwargs)
        return wrapper
    return decorator