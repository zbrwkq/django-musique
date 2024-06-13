from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User

from .serializers import FollowsSerializer
from .models import Follows

# Create your views here.


@api_view(['GET'])
def get_follows(request):
    follows = Follows.objects.all()

    serializer = FollowsSerializer(follows, many=True)

    return Response({"Follows" : serializer.data})


@api_view(['GET'])
def get_follows_by_user(request, id_user):
    follows = get_list_or_404(Follows, id_user=id_user)

    serializer = FollowsSerializer(follows, many=True)

    return Response({"Follows" : serializer.data})

@api_view(['GET'])
def get_followed_by_user(request, id_follow):
    follows = get_list_or_404(Follows, id_follow=id_follow)

    serializer = FollowsSerializer(follows, many=True)

    return Response({"Follows" : serializer.data})


@api_view(['GET'])
def get_follow(request, id):
    follows = get_object_or_404(Follows, id=id)

    serializer = FollowsSerializer(follows, many=False)

    return Response({"Follow" : serializer.data})

@api_view(['POST'])
def toggle_friend(request, user_id):
    try:
        current_user_id = request.user.id
        if not current_user_id:
            return Response({'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        friend_user_id = user_id

        follow, created = Follows.objects.get_or_create(id_user=current_user_id, id_follow=friend_user_id)

        if created:
            message = 'Ami ajouté'
        else:
            follow.delete()
            message = 'Ami supprimé'

        return Response({'message': message}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)