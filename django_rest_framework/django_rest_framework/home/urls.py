from django.contrib import admin
from django.urls import path, include 
from .views import *
from django.conf.urls.static import static



urlpatterns = [
   # path('user',user.as_view()),
   path('home',home),
   path('user',user),
   path('user/<str:userId>',User_By_Id.as_view(),name='User_By_Id'),
   path('user-register',register),
   path('auth',login),
   path('forgot-password',forgot_password.as_view()),
   path('otp-verify',verify_otp),
   path('todo',Todos.as_view()),
   path('todo/<str:todo_id>',Todo_By_Id.as_view(),name='Todo_By_Id'),
   path('user/<str:userId>/changePassword',change_password),
   path('user/<str:userId>/changeProfilePhoto',change_profile_photo)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)