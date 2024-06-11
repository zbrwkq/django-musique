from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

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