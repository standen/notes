from hashlib import sha256

def getHashSha256(text):
    return sha256(text.encode('utf-8')).hexdigest()