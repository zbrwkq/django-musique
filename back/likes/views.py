from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

from .serializers import LikesSerializer
from .models import Likes

# Create your views here.


@api_view(['GET'])
def get_likes(request):
    likes = Likes.objects.all()

    serializer = LikesSerializer(likes, many=True)

    return Response({"Likes" : serializer.data})


@api_view(['GET'])
def get_likes_by_track(request, id_track):
    likes = get_list_or_404(Likes, id_track=id_track)

    serializer = LikesSerializer(likes, many=True)

    return Response({"Likes" : serializer.data})


@api_view(['GET'])
def get_likes_by_artist(request, id_artist):
    likes = get_list_or_404(Likes, id_artist=id_artist)

    serializer = LikesSerializer(likes, many=True)

    return Response({"Likes" : serializer.data})


@api_view(['GET'])
def get_likes_by_album(request, id_album):
    likes = get_list_or_404(Likes, id_album=id_album)

    serializer = LikesSerializer(likes, many=True)

    return Response({"Likes" : serializer.data})


@api_view(['GET'])
def get_like(request, id):
    likes = get_object_or_404(Likes, id=id)

    serializer = LikesSerializer(likes, many=False)

    return Response({"Like" : serializer.data})