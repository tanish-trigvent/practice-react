# users/default_user.py
from pymongo import MongoClient
from datetime import datetime
from .methods.password_hash import hash_password  # Ensure this imports correctly
from .models import *

def create_default_user():
    # Define the default user details
    default_user = {
        'firstName': 'admin',
        'lastName': 'admin',
        'email': 'admin12@yopmail.com',
        'password': hash_password('Password@123'),  # Hash the password
        'role': 'admin',  # Set the default role
        'otp': '',
        'profilePhoto': '',
        'created_at': datetime.utcnow(),
        'updated_at': datetime.utcnow(),
    }

    # Check if the user already exists
    if User.find_one({'email': default_user['email']}) is None:
        User.insert_one(default_user)
        print('Default user created successfully.')
    else:
        print('Default user already exists.')
