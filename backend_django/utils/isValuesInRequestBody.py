def isValuesInRequestBody(keys, bodyParams):
    if (keys == None or object == None):
        return {}
    
    result = {}
    
    for key in keys:
        if (not bodyParams.get(key) != None):
            return False
        result.update({key: bodyParams.get(key)})
    
    return result