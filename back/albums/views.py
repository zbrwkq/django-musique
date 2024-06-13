import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from .serializers import AlbumsSerializer
from .models import Albums
from spotify.views import get_token

@api_view(['GET'])
def get_albums(request):
    """
    get:
    Retourne la liste de tous les albums.

    Réponse:
    - 200 OK: Retourne une liste des albums.
    """
    albums = Albums.objects.all()
    serializer = AlbumsSerializer(albums, many=True)
    return Response({"Albums": serializer.data})

@api_view(['GET'])
def get_album(request, id):
    """
    get:
    Retourne les détails d'un album spécifique en utilisant l'API de Spotify.

    Paramètres:
    - id (str): L'ID de l'album.

    Réponse:
    - 200 OK: Retourne les détails de l'album.
    - 404 Not Found: Si l'album n'est pas trouvé.
    """
    access_token = get_token()
    album_url = f'https://api.spotify.com/v1/albums/{id}'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get(album_url, headers=headers)

    if response.status_code != 200:
        return render(request, 'error.html', {'message': 'Failed to fetch album details'})

    album_data = response.json()
    return Response(album_data)
