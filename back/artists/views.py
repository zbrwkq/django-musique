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
    artists = Artists.objects.all()

    serializer = ArtistsSerializer(artists, many=True)

    return Response({"Artists" : serializer.data})


@api_view(['GET'])
def get_artist(request, id):

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
