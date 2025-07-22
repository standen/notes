from typing import Union

def isValuesInRequestBody(keys, object):
    result = {}
    
    for key in keys:
        if (not object.get(key) != None):
            return False
        result.update({key: object.get(key)})
    
    return result