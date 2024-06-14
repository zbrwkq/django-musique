import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render, get_object_or_404
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

def get_album_by_id_spotify(id):
    album = Albums.objects.filter(id_album=id).first()

    if not album :
        access_token = get_token()
        album_url = f'https://api.spotify.com/v1/albums/{str(id)}'
        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        response = requests.get(album_url, headers=headers)

        album_data = response.json()
        
        album = Albums(
            id=int(get_last_id())+1,
            id_album=id,
            name=album_data.get('name', None),
            photo_url=album_data.get('images', [])[0].get('url', None),
            artist=album_data.get('artists', [])[0].get('name', None),
            id_artist=album_data.get('artists', [])[0].get('id', None),
        )

        album.save()

    serializer = AlbumsSerializer(album, many=False)

    return serializer.data

def get_last_id():
    albums = Albums.objects.all()
    last_album = albums.order_by('-id').first()
    return last_album.id

@api_view(['GET'])
def get_album_by_id(request, id):
    album = get_object_or_404(Albums, id=id)

    serializer = AlbumsSerializer(album, many=False)

    return Response({"Album" : serializer.data})
