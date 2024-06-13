from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

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
    artists = get_object_or_404(Artists, id=id)

    serializer = ArtistsSerializer(artists, many=False)

    return Response({"Artist" : serializer.data})


@api_view(['GET'])
def get_artist_by_id(request, id):
    artist = get_object_or_404(Artists, id=id)

    serializer = ArtistsSerializer(artist, many=False)

    return Response({"Artist" : serializer.data})