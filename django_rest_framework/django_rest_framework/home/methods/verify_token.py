import jwt



def verify_token(token):
    auth_token = token.split(' ')[1]
    decoded_token = jwt.decode(auth_token, options={"verify_signature": False})
    return decoded_token