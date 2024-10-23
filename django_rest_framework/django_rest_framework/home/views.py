from rest_framework.decorators import api_view
from .decorators import jwt_required
from rest_framework.response import Response
from .models import *
from .serializers import * 
from rest_framework.views import APIView
from .methods.password_hash import *
from datetime import datetime
from .methods.gen_token import create_jwt_token
from .methods.serialize_data import serialize_data
from bson.json_util import default
from django.http import JsonResponse
from bson import ObjectId
from .methods.send_otp_mail import SendMail
from .methods.verify_token import verify_token
from django.core.files.storage import default_storage
import os
from django.conf import settings

# Create your views here.

@api_view(['GET'])
def home(request):
    userData = User.find()
    print(userData)
    return Response({'status': 200, 'payload':'success'})




# User Register 

@api_view(['POST'])
def register(request):
    data = request.data
    hashPassword = hash_password(data.get('password'))
    payload = {
        'firstName': data['firstName'],
        'lastName': data['lastName'],
        'email': data['email'],
        'password': hashPassword,
        'role': data.get('role', 'user'),  
        'otp': data.get('otp', ''),
        'profilePhoto': data.get('profilePhoto', ''),
        'created_at': datetime.utcnow(),    
        'updated_at': datetime.utcnow()      
    }
    try:
        isUser = User.find_one({'email': data.get('email')})
        if isUser:
            return Response({'status':400,'message':'User already exists'})
       
        
        User.insert_one(payload)
        return Response({'message':'User registered successfully'})

    except Exception as e:
       return Response({'status': 400, 'message':str(e)})


# Login User 

@api_view(['POST'])
def login(request):
    try:
        data = request.data
        email = data.get('email')
        password = data.get('password')
        user = User.find_one({'email': email})
        if user:
            if check_password(password, user['password']):
                token = create_jwt_token(user['email'])
                print(token)
                serialized_data = serialize_data(user)
                return Response({'token': token, 'data': serialized_data})
            else:
                return Response({'status':401,'message':'Invalid password'})
    except Exception as e:
        return Response({'status': 400, 'message':str(e)})




@api_view(['GET'])
@jwt_required
def user(request):
    users_cursor = User.find({'role':'user'})
    users_list = list(users_cursor)
    for user in users_list:
        user['created_at'] = str(user['created_at'])
        user['updated_at'] = str(user['updated_at'])
        user['_id'] = str(user['_id'])
    # serialized = userSerializer(users)
    return JsonResponse(users_list, safe=False, json_dumps_params={'default': default})




class User_By_Id(APIView):

    def delete(self,request,userId):
        try:
            User.find_one_and_delete({'_id':ObjectId(userId)})
            return Response('User deleted successfully')
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})
        
    def put(self,request,userId):
        try:
            user = User.find_one_and_update({'_id':ObjectId(userId)},{'$set':{'firstName':request.data['firstName'],'lastName':request.data['lastName']}})
            user['created_at'] = str(user['created_at'])
            user['updated_at'] = str(user['updated_at'])
            user['_id'] = str(user['_id'])
            return Response({'message':'User updated successfully','user':user})
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})    
        
        
    def get(self,request,userId):
        try:
            user = User.find_one({'_id':ObjectId(userId)})
            user['created_at'] = str(user['created_at'])
            user['updated_at'] = str(user['updated_at'])
            user['_id'] = str(user['_id'])
            return JsonResponse(user, safe=False)
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})
        


class forgot_password(APIView):

    def post(self,request):
        try:
            user_email = request.data['email']
            otp = SendMail(user_email)
            User.find_one_and_update({'email':user_email},{'$set':{'otp':otp}})
            return Response({'message':'OTP sent successfully'})
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})

    def put(self,request):
        try:
            password = request.data['password']
            token = request.data['token']
            isTokenVerified = verify_token(token)
            if not isTokenVerified:
                return Response({'status': 400,'message':'Invalid token'})
            
            new_password = hash_password(password)
            user_email = isTokenVerified['email']
            data = User.find_one_and_update({'email':user_email},{'$set':{'password':new_password}})
            return Response({'message':'Password updated successfully'})
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})



@api_view(['POST'])
def verify_otp(request):
        try:
            user_email = request.data['email']
            otp_received = request.data['otp']
            user = User.find_one({'email':user_email})
            if user['otp'] == otp_received:
                token = create_jwt_token(user_email)
                User.find_one_and_update({'email':user_email},{'$set':{'otp':''}})  # Reset OTP after successful verification
                return Response({'message':'OTP verified successfully','token':token})
            else:
                return Response({'status': 400,'message':'Invalid OTP'})
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})





class Todos(APIView):

    def post(self,request):
        try:
            data = request.data
            auth_token = request.META.get('HTTP_AUTHORIZATION')
            isToken = verify_token(auth_token)
            user_email = isToken['email']
            user_details = User.find_one({'email': user_email})
            if user_details:
                todo = {
                            "description": data['description'],
                            "endTime": data['endTime'],
                            "startTime": data['startTime'],
                            "status": data['status'],
                            "title": data['title'],
                            'createdAt': datetime.utcnow(),
                            'updatedAt': datetime.utcnow(),
                            'createdBy':ObjectId(user_details['_id'])
                        }
                Todo.insert_one(todo)
                return Response('Todo created successfully')
            else:
                return Response({'status': 401,'message':'User not found'})
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})

    def get(self, request):
        try:
            auth_token = request.META.get('HTTP_AUTHORIZATION')
            isToken = verify_token(auth_token)
            user_email = isToken['email']
            user_details = User.find_one({'email': user_email})
            if user_details:
                if(user_details['role'] == 'admin'):
                    query = request.GET.get('q', '')
                    todos_cursor = Todo.find({'$or':[{'title':{'$regex' :query,'$options':"i"}},{'description':{'$regex':query,'$options':"i"}}]});
                    todos_list = list(todos_cursor)
                    for todo in todos_list:
                        todo['createdAt'] = str(todo['createdAt'])
                        todo['updatedAt'] = str(todo['updatedAt'])
                        todo['_id'] = str(todo['_id'])
                    return JsonResponse(todos_list, safe=False, json_dumps_params={'default': default})
                else:    
                    todos_cursor = Todo.find({'createdBy': ObjectId(user_details['_id'])})
                    todos_list = list(todos_cursor)
                    for todo in todos_list:
                        todo['createdAt'] = str(todo['createdAt'])
                        todo['updatedAt'] = str(todo['updatedAt'])
                        todo['_id'] = str(todo['_id'])
                    return JsonResponse(todos_list, safe=False, json_dumps_params={'default': default})
            else:
                return Response({'status': 401,'message':'User not found'})
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})


class Todo_By_Id(APIView):

    def put(self, request,todo_id):
        try:
            auth_token = request.META.get('HTTP_AUTHORIZATION')
            data = request.data
            isToken = verify_token(auth_token)
            user_email = isToken['email']
            user_details = User.find_one({'email': user_email})
            if user_details:
                Todo.find_one_and_update({'_id': ObjectId(todo_id)},
                                            {
                                                '$set':{
                                                            "description": data['description'],
                                                            "endTime": data['endTime'],
                                                            "startTime": data['startTime'],
                                                            "status": data['status'],
                                                            "title": data['title'],
                                                            'updatedAt': datetime.utcnow(),
                                                        }
                                            })
                return Response({'message':'Todo updated successfully'})
            else:
                return Response({'status': 401,'message':'User not found'})
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})


    def delete(self, request, todo_id):
        try:
            auth_token = request.META.get('HTTP_AUTHORIZATION')
            isToken = verify_token(auth_token)
            user_email = isToken['email']
            user_details = User.find_one({'email': user_email})
            if user_details:
                Todo.find_one_and_delete({'_id': ObjectId(todo_id)})
                return Response('Todo deleted successfully')
            else:
                return Response({'status': 401,'message':'User not found'})
        except Exception as e:
            return Response({'status': 400, 'message':str(e)})
        




@api_view(['PUT'])
@jwt_required
def change_password(request,userId):
    try:
        user = User.find_one({'_id':ObjectId(userId)})
        old_password = request.data['currentPassword']
        new_password = request.data['newPassword']
        is_password_match = check_password(old_password, user['password'])
        if is_password_match:
            new_password_hash = hash_password(new_password)
            User.find_one_and_update({'_id':ObjectId(userId)},{'$set':{'password':new_password_hash}})
            return Response({'message':'Password updated successfully'})
        else:
            return Response({'status': 400,'message':'Invalid current password '})
    except Exception as e:
        return Response({'status': 400, 'message':str(e)})



@api_view(['PUT'])
@jwt_required
def change_profile_photo(request, userId):
    try:
        # Get the uploaded file from the request
        profile_photo = request.FILES.get('file')

        # Check if a file was provided
        if not profile_photo:
            return Response({"error": "No file provided"}, status=400)

        # Define the file path relative to MEDIA_ROOT
        file_path = os.path.join('profile_photos', profile_photo.name)
        
        # Save the file using Django's default storage system
        full_path = default_storage.save(file_path, profile_photo)
        file_url = os.path.join(settings.MEDIA_URL, full_path)  # Construct the URL to access the file

        # Update the user's profile photo in MongoDB
        user = User.find_one_and_update(
            {'_id': ObjectId(userId)},
            {'$set': {'profilePhoto': file_url}},
            return_document=True  # Get the updated user document
        )

        # Check if the user was found and updated
        if user is None:
            return Response({"error": "User not found"}, status=404)

        # Convert ObjectId to string and format date fields
        user['created_at'] = str(user['created_at'])
        user['updated_at'] = str(user['updated_at'])
        user['_id'] = str(user['_id'])

        # Return success response with user details
        return Response({
            "message": "Profile photo updated successfully",
            "userDetails": user
        })
    
    except Exception as e:
        # Handle any exceptions that occur
        return Response({"error": str(e)}, status=500)
