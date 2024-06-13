from django.shortcuts import get_object_or_404
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

from spotify.views import get_token

from .serializers import ArtistsSerializer
from .models import Artists

# Create your views here.

@api_view(['GET'])
def get_artists(request):
    """
    get:
    Retourne la liste de tous les artistes.

    Réponse:
    - 200 OK: Retourne une liste des artistes.
    """
    artists = Artists.objects.all()

    serializer = ArtistsSerializer(artists, many=True)

    return Response({"Artists" : serializer.data})


@api_view(['GET'])
def get_artist(request, id):
    """
    get:
    Retourne les détails d'un artiste spécifique en utilisant l'API de Spotify.

    Paramètres:
    - id (str): L'ID de l'artiste.

<<<<<<< HEAD
    Réponse:
    - 200 OK: Retourne les détails de l'artiste, y compris ses meilleurs morceaux et ses albums.
    - 404 Not Found: Si l'artiste n'est pas trouvé.
    """
    access_token = get_token()


    artist_url = f'https://api.spotify.com/v1/artists/{id}'
    headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = requests.get(artist_url, headers=headers)

    if response.status_code != 200:
        return render(request, 'error.html', {'message': 'Failed to fetch artist details'})

    artist_data = response.json()

    top_tracks_url = f'https://api.spotify.com/v1/artists/{id}/top-tracks'

    response = requests.get(top_tracks_url, headers=headers)

    
    if response.status_code != 200:
        return render(request, 'error.html', {'message': 'Failed to fetch artist top tracks'})

    top_tracks_data = response.json()

    artist_data['top_tracks'] = top_tracks_data

    albums_url = f'https://api.spotify.com/v1/artists/{id}/albums?limit=4'

    response = requests.get(albums_url, headers=headers)

    
    if response.status_code != 200:
        return render(request, 'error.html', {'message': 'Failed to fetch artist albums'})

    albums_data = response.json()

    artist_data['albums'] = albums_data

    return Response(artist_data)
=======
    return Response({"Artist" : serializer.data})


@api_view(['GET'])
def get_artist_by_id(request, id):
    artist = get_object_or_404(Artists, id=id)

    serializer = ArtistsSerializer(artist, many=False)

    return Response({"Artist" : serializer.data})
>>>>>>> 44d0fc0 (finish functionnality)
