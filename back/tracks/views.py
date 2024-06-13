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
    """
    get:
    Retourne la liste de tous les tracks.

    Réponse:
    - 200 OK: Retourne une liste des tracks.
    """
    tracks = Tracks.objects.all()

    serializer = TracksSerializer(tracks, many=True)

    return Response({"Tracks" : serializer.data})


@api_view(['GET'])
def get_track(request, id):
    """
    get:
    Retourne les détails d'un track spécifique.

    Paramètres:
    - id (int): L'ID du track.

    Réponse:
    - 200 OK: Retourne les détails du track.
    - 404 Not Found: Si le track n'est pas trouvé.
    """
    tracks = get_object_or_404(Tracks, id=id)

    serializer = TracksSerializer(tracks, many=False)

    return Response({"Track" : serializer.data})

@api_view(['GET'])
def get_tracks_preview(request, id):
    """
    get:
    Retourne les détails de prévisualisation d'un track spécifique depuis l'API Spotify.

    Paramètres:
    - id (int): L'ID du track Spotify.

    Réponse:
    - 200 OK: Retourne les détails de prévisualisation du track.
    - 404 Not Found: Si le track n'est pas trouvé sur Spotify.
    """
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

@api_view(['GET'])
def get_track_by_id(request, id):
    track = get_object_or_404(Tracks, id=id)

    serializer = TracksSerializer(track, many=False)

    return Response({"Track" : serializer.data})


def get_track_by_id_spotify(id):
    track = get_object_or_404(Tracks, spotify_id=id)

    serializer = TracksSerializer(track, many=False)

    return serializer.data