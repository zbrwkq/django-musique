from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import render
import requests

from .serializers import TracksSerializer
from .models import Tracks
from spotify.views import get_token
# Create your views here.


@api_view(['GET'])
def get_tracks(request):
    tracks = Tracks.objects.all()

    serializer = TracksSerializer(tracks, many=True)

    return Response({"Tracks" : serializer.data})


@api_view(['GET'])
def get_track(request, id):
    tracks = get_object_or_404(Tracks, id=id)

    serializer = TracksSerializer(tracks, many=False)

    return Response({"Track" : serializer.data})

@api_view(['GET'])
def get_tracks_preview(request, id):
    access_token = get_token()

    preview_url = f'https://api.spotify.com/v1/tracks/{id}'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get(preview_url, headers=headers)

    if response.status_code != 200:
        return render(request, 'error.html', {'message': 'Failed to fetch preview url'})

    preview_data = response.json()

    return Response(preview_data)