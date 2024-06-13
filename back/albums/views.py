from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response


from django.shortcuts import render

from .serializers import AlbumsSerializer
from .models import Albums

# Create your views here.


@api_view(['GET'])
def get_albums(request):
    albums = Albums.objects.all()

    serializer = AlbumsSerializer(albums, many=True)

    return Response({"Albums" : serializer.data})


@api_view(['GET'])
def get_album(request, id):
    albums = get_object_or_404(Albums, id=id)

    serializer = AlbumsSerializer(albums, many=False)

    return Response({"Album" : serializer.data})