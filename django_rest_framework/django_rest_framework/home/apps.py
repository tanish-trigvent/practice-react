from django.apps import AppConfig
from .default_user import create_default_user

class HomeConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'home' 
    def ready(self):
        create_default_user()

    
    