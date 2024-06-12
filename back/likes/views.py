from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

from .serializers import LikesSerializer
from .models import Likes
import logging

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


@api_view(['POST'])
def like_album(request, album_id):
    try:
        user_id = 1

        if not user_id:
            return Response({'message': 'Le paramètre user_id est requis'}, status=400)

        like_created = Likes.toggle_like(user_id=user_id, album_id=album_id)

        if like_created:
            return Response({'message': 'Like ajouté'})
        else:
            return Response({'message': 'Like supprimé'})

    except Exception as e:
        return Response({'message': str(e)}, status=500)


@api_view(['POST'])
def like_artist(request, id_artist):
    try:
        id_user = request.data.get('id_user')

        if not id_user:
            return Response({'message': 'Le paramètre user_id est requis'}, status=400)

        like_created = Likes.toggle_like_artist(user_id=id_user, id_artist=id_artist)

        if like_created:
            return Response({'message': 'Like ajouté'})
        else:
            return Response({'message': 'Like supprimé'})

    except Exception as e:
        return Response({'message': str(e)}, status=500)


@api_view(['GET'])
def get_artists_likes_by_user(request, id_user):
    liked_artists = Likes.objects.filter(id_user=id_user).values_list('id_artist', flat=True).distinct()
    return Response({'liked_artists': liked_artists})