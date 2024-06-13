from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.views.decorators.http import require_http_methods
from django.shortcuts import render

from .serializers import CommentsSerializer
from .models import Comments

from albums.views import get_album_by_id_spotify
from artists.views import get_artist_by_id_spotify
from tracks.views import get_track_by_id_spotify

@api_view(['GET'])
def get_comments(request):
    """
    get:
    Retourne la liste de tous les commentaires.

    Réponse:
    - 200 OK: Retourne une liste des commentaires.
    """
    comments = Comments.objects.all()

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_user(request, id_user): 
    """
    get:
    Retourne la liste des commentaires d'un utilisateur spécifique.

    Paramètres:
    - id_user (int): L'ID de l'utilisateur.

    Réponse:
    - 200 OK: Retourne une liste des commentaires de l'utilisateur.
    - 404 Not Found: Si aucun commentaire n'est trouvé pour cet utilisateur.
    """
    comments = Comments.objects.filter(id_user=id_user)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_track(request, id):
    """
    get:
    Retourne la liste des commentaires pour une piste spécifique.

    Paramètres:
    - id_track (int): L'ID de la piste.

    Réponse:
    - 200 OK: Retourne une liste des commentaires pour la piste.
    - 404 Not Found: Si aucun commentaire n'est trouvé pour cette piste.
    """
    try:
        id = int(id)
    except ValueError:
        id = get_track_by_id_spotify(id).get('id')  

    comments = Comments.objects.filter(id_track=id)

    serializer = CommentsSerializer(comments, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_comments_by_artist(request, id):
    
    """
    get:
    Retourne la liste des commentaires pour un artiste spécifique.

    Paramètres:
    - id_artist (int): L'ID de l'artiste.

    Réponse:
    - 200 OK: Retourne une liste des commentaires pour l'artiste.
    - 404 Not Found: Si aucun commentaire n'est trouvé pour cet artiste.
    """
    try:
        id = int(id)
    except ValueError:
        id = get_artist_by_id_spotify(id).get('id')

    comments = Comments.objects.filter(id_artist=id)

    serializer = CommentsSerializer(comments, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_comments_by_album(request, id):
    """
    get:
    Retourne la liste des commentaires pour un album spécifique.

    Paramètres:
    - id_album (int): L'ID de l'album.

    Réponse:
    - 200 OK: Retourne une liste des commentaires pour l'album.
    - 404 Not Found: Si aucun commentaire n'est trouvé pour cet album.
    """
    try:
        id = int(id)
    except ValueError:
        id = get_album_by_id_spotify(id).get('id')

    comments = Comments.objects.filter(id_album=id)

    serializer = CommentsSerializer(comments, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_comment(request, id):
    """
    get:
    Retourne les détails d'un commentaire spécifique.

    Paramètres:
    - id (int): L'ID du commentaire.

    Réponse:
    - 200 OK: Retourne les détails du commentaire.
    - 404 Not Found: Si le commentaire n'est pas trouvé.
    """
    comment = get_object_or_404(Comments, id=id)

    serializer = CommentsSerializer(comment, many=False)

    return Response({"Comment" : serializer.data})

@require_http_methods(["GET", "POST"])
@api_view(['POST'])
def add_comment(request):
    """
    post:
    Ajoute un nouveau commentaire.

    Paramètres:
    - request (Request): Les données de la requête.

    Réponse:
    - 201 Created: Retourne les détails du commentaire créé.
    """
    data = request.data

    id_user = data.get('id_user')
    rating = data.get('rating')
    comment = data.get('comment')
    id_album = get_album_by_id_spotify(data.get('id_album')).get('id')
    id_artist = data.get('id_artist')
    id_track = data.get('id_track')

    if rating is None or id_album is None:
        return Response({"error": "Rating and album ID are required."}, status=status.HTTP_400_BAD_REQUEST)

    new_comment = Comments(
        id_user=id_user,
        rating=rating,
        comment=comment,
        id_album=id_album,
        id_artist=id_artist,
        id_track=id_track
    )
    new_comment.save()

    serializer = CommentsSerializer(new_comment, many=False)

    return Response(serializer.data)

@api_view(['DELETE'])
def delete_comment(request, id):
    try:
        comment = Comments.objects.get(id=id)
    except Comments.DoesNotExist:
        return Response({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)

    comment.delete()
    return Response({"message": "Comment deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
  
