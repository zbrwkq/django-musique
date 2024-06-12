from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from django.shortcuts import render

from .serializers import TracksSerializer
from .models import Tracks
from rest_framework.permissions import IsAuthenticated
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tracks(request):
    tracks = Tracks.objects.all()

    serializer = TracksSerializer(tracks, many=True)
    print(request.user.id)
    return Response({"Tracks" : serializer.data})


@api_view(['GET'])
def get_track(request, id):
    tracks = get_object_or_404(Tracks, id=id)

    serializer = TracksSerializer(tracks, many=False)

    return Response({"Track" : serializer.data})