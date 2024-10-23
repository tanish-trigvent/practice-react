from rest_framework import serializers
from .models import *

class userSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = User
        # fields = ['id', 'first_name', 'last_name', 'email']
        fields = '__all__'