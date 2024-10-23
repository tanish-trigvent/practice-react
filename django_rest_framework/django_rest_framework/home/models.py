from django.db import models
from .db_connection import db


# Create your models here.
# class User(models.Model):
#     firstName = models.CharField(max_length=100)
#     lastName = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     password = models.CharField(max_length=50)

User = db['users']
Todo = db['todo']