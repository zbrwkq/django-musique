from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from django.shortcuts import render

from .serializers import UsersSerializer

# Create your views here.


@api_view(['GET'])
def get_users(request):
    users = User.objects.all()

    serializer = UsersSerializer(users, many=True)

    return Response({"Users" : serializer.data})


@api_view(['GET'])
def get_user(request, id):
    users = get_object_or_404(User, id=id)

    serializer = UsersSerializer(users, many=False)

    return Response({"User" : serializer.data})


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    