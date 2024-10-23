import jwt
import datetime

# Sample secret key (you should use a secure, random secret in production)
SECRET_KEY = 'xLg&`Cmd/cRU87<~jQz$eh'

# Example function to generate a token
def create_jwt_token(email):
    # Set the expiration time for the token (optional)
    expiration = datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Token valid for 1 day
    
    # Create the token
    token = jwt.encode({
        'email': email
    }, SECRET_KEY, algorithm="HS256")

    return token
