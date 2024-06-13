from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

from .serializers import LikesSerializer
from .models import Likes
import logging

# Create your views here.


@api_view(['GET'])
def get_likes(request):
    """
    get:
    Retourne la liste de tous les likes.

    Réponse:
    - 200 OK: Retourne une liste des likes.
    """
    likes = Likes.objects.all()

    serializer = LikesSerializer(likes, many=True)

    return Response({"Likes" : serializer.data})


@api_view(['GET'])
def get_likes_by_track(request, id_track):
    """
    get:
    Retourne la liste des likes pour une piste spécifique.

    Paramètres:
    - id_track (int): L'ID de la piste.

    Réponse:
    - 200 OK: Retourne une liste des likes pour la piste.
    - 404 Not Found: Si aucun like n'est trouvé pour cette piste.
    """
    likes = get_list_or_404(Likes, id_track=id_track)

    serializer = LikesSerializer(likes, many=True)

    return Response({"Likes" : serializer.data})


@api_view(['GET'])
def get_likes_by_artist(request, id_artist):
    """
    get:
    Retourne la liste des likes pour un artiste spécifique.

    Paramètres:
    - id_artist (int): L'ID de l'artiste.

    Réponse:
    - 200 OK: Retourne une liste des likes pour l'artiste.
    - 404 Not Found: Si aucun like n'est trouvé pour cet artiste.
    """
    likes = get_list_or_404(Likes, id_artist=id_artist)

    serializer = LikesSerializer(likes, many=True)

    return Response({"Likes" : serializer.data})


@api_view(['GET'])
def get_likes_by_album(request, id_album):
    """
    get:
    Retourne la liste des likes pour un album spécifique.

    Paramètres:
    - id_album (int): L'ID de l'album.

    Réponse:
    - 200 OK: Retourne une liste des likes pour l'album.
    - 404 Not Found: Si aucun like n'est trouvé pour cet album.
    """
    likes = get_list_or_404(Likes, id_album=id_album)

    serializer = LikesSerializer(likes, many=True)

    return Response({"Likes" : serializer.data})


@api_view(['GET'])
def get_like(request, id):
    """
    get:
    Retourne les détails d'un like spécifique.

    Paramètres:
    - id (int): L'ID du like.

    Réponse:
    - 200 OK: Retourne les détails du like.
    - 404 Not Found: Si le like n'est pas trouvé.
    """
    likes = get_object_or_404(Likes, id=id)

    serializer = LikesSerializer(likes, many=False)

    return Response({"Like" : serializer.data})


@api_view(['POST'])
def like_album(request, album_id):
    """
    post:
    Ajoute ou supprime un like pour un album spécifique.

    Paramètres:
    - album_id (int): L'ID de l'album.

    Réponse:
    - 200 OK: Si l'opération a réussi, retourne un message indiquant l'ajout ou la suppression du like.
    - 500 Internal Server Error: Si une erreur interne se produit lors de l'ajout ou de la suppression du like.
    """
    try:
        user_id = request.user.id

        like_created = Likes.toggle_like(user_id=user_id, album_id=album_id)

        if like_created:
            return Response({'message': 'Like ajouté'})
        else:
            return Response({'message': 'Like supprimé'})

    except Exception as e:
        return Response({'message': str(e)}, status=500)

@api_view(['POST'])
def like_artist(request, id_artist):
    """
    post:
    Ajoute ou supprime un like pour un artiste spécifique.

    Paramètres:
    - id_artist (int): L'ID de l'artiste.

    Réponse:
    - 200 OK: Si l'opération a réussi, retourne un message indiquant l'ajout ou la suppression du like.
    - 500 Internal Server Error: Si une erreur interne se produit lors de l'ajout ou de la suppression du like.
    """
    try:
        id_user = request.user.id

        like_created = Likes.toggle_like_artist(user_id=id_user, id_artist=id_artist)

        if like_created:
            return Response({'message': 'Like ajouté'})
        else:
            return Response({'message': 'Like supprimé'})

    except Exception as e:
        return Response({'message': str(e)}, status=500)
        
@api_view(['POST'])
def like_track(request, track_id):
    """
    post:
    Ajoute ou supprime un like pour une piste spécifique.

    Paramètres:
    - track_id (int): L'ID de la piste.

    Réponse:
    - 200 OK: Si l'opération a réussi, retourne un message indiquant l'ajout ou la suppression du like.
    - 500 Internal Server Error: Si une erreur interne se produit lors de l'ajout ou de la suppression du like.
    """
    try:
        user_id = request.user.id

        like_created = Likes.toggle_like_track(user_id=user_id, track_id=track_id)

        if like_created:
            return Response({'message': 'Like ajouté'})
        else:
            return Response({'message': 'Like supprimé'})

    except Exception as e:
        return Response({'message': str(e)}, status=500)

@api_view(['GET'])
def get_artists_likes_by_user(request, id_user):
    """
    get:
    Retourne la liste des artistes aimés par un utilisateur spécifique.

    Paramètres:
    - id_user (int): L'ID de l'utilisateur.

    Réponse:
    - 200 OK: Retourne une liste des ID d'artistes aimés par l'utilisateur.
    """
    liked_artists = Likes.objects.filter(id_user=id_user).exclude(id_artist__isnull=True).values_list('id_artist', flat=True).distinct()
    return Response({'liked_artists': liked_artists})

@api_view(['GET'])
def get_albums_likes_by_user(request, id_user):
    """
    get:
    Retourne la liste des albums aimés par un utilisateur spécifique.

    Paramètres:
    - id_user (int): L'ID de l'utilisateur.

    Réponse:
    - 200 OK: Retourne une liste des ID d'albums aimés par l'utilisateur.
    """
    liked_albums = Likes.objects.filter(id_user=id_user).exclude(id_album__isnull=True).values_list('id_album', flat=True).distinct()
    return Response({'liked_albums': liked_albums})
    
@api_view(['GET'])
def get_tracks_likes_by_user(request, id_user):
    """
    get:
    Retourne la liste des pistes aimées par un utilisateur spécifique.

    Paramètres:
    - id_user (int): L'ID de l'utilisateur.

    Réponse:
    - 200 OK: Retourne une liste des ID de pistes aimées par l'utilisateur.
    """
    liked_tracks = Likes.objects.filter(id_user=id_user).exclude(id_track__isnull=True).values_list('id_track', flat=True).distinct()
    return Response({'liked_tracks': liked_tracks})
