def isValuesInRequestBody(keys, object):
    result = {}
    
    for key in keys:
        if (not object.get(key)):
            return False
        result.update({key: object.get(key)})
    
    return result