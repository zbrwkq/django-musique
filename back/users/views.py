from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
