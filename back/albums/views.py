import requests

from rest_framework.decorators import api_view
from rest_framework.response import Response


from django.shortcuts import render

from .serializers import AlbumsSerializer
from .models import Albums
from spotify.views import get_token

# Create your views here.


@api_view(['GET'])
def get_albums(request):
    albums = Albums.objects.all()

    serializer = AlbumsSerializer(albums, many=True)

    return Response({"Albums" : serializer.data})

@api_view(['GET'])
def get_album(request, id):
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