from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

from django.shortcuts import render

from .serializers import UsersSerializer
from .models import Users

# Create your views here.


@api_view(['GET'])
def get_users(request):
    users = Users.objects.all()

    serializer = UsersSerializer(users, many=True)

    return Response({"Users" : serializer.data})


@api_view(['GET'])
def get_user(request, id):
    users = get_object_or_404(Users, id=id)

    serializer = UsersSerializer(users, many=False)

    return Response({"User" : serializer.data})


@api_view(['POST'])
def register(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    if Users.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = Users(email=email, password=password)
    user.save()
    serializer = UsersSerializer(user)

    return Response({'message': 'User registered successfully', 'user': serializer.data}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = Users.objects.get(email=email)
    except Users.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

    if not user.check_password(password):
        return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = UsersSerializer(user)
    return Response({'message': 'Login successful', 'user': serializer.data}, status=status.HTTP_200_OK)