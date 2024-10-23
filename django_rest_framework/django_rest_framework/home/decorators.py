
import jwt
from functools import wraps
from rest_framework import exceptions  # Import exceptions here
from rest_framework.response import Response
from rest_framework import status

SECRET_KEY = 'xLg&`Cmd/cRU87<~jQz$eh'  # Use your actual secret key

def verify_jwt_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise exceptions.AuthenticationFailed('Token has expired.')
    except jwt.InvalidTokenError:
        raise exceptions.AuthenticationFailed('Invalid token.')

def jwt_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')
        if not token:
            return Response({'error': 'Authorization header not found.'}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            token = token.split(' ')[1]
            payload = verify_jwt_token(token)
            request.user = payload  # Optionally attach user data to request
            return view_func(request, *args, **kwargs)
        except exceptions.AuthenticationFailed as e:
            return Response({'error': str(e)}, status=status.HTTP_401_UNAUTHORIZED)

    return _wrapped_view
