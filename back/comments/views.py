from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

from .serializers import CommentsSerializer
from .models import Comments


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
    comments = get_list_or_404(Comments, id_user=id_user)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_track(request, id_track):
    """
    get:
    Retourne la liste des commentaires pour une piste spécifique.

    Paramètres:
    - id_track (int): L'ID de la piste.

    Réponse:
    - 200 OK: Retourne une liste des commentaires pour la piste.
    - 404 Not Found: Si aucun commentaire n'est trouvé pour cette piste.
    """
    comments = get_list_or_404(Comments, id_track=id_track)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_artist(request, id_artist):
    """
    get:
    Retourne la liste des commentaires pour un artiste spécifique.

    Paramètres:
    - id_artist (int): L'ID de l'artiste.

    Réponse:
    - 200 OK: Retourne une liste des commentaires pour l'artiste.
    - 404 Not Found: Si aucun commentaire n'est trouvé pour cet artiste.
    """
    comments = get_list_or_404(Comments, id_artist=id_artist)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_album(request, id_album):
    """
    get:
    Retourne la liste des commentaires pour un album spécifique.

    Paramètres:
    - id_album (int): L'ID de l'album.

    Réponse:
    - 200 OK: Retourne une liste des commentaires pour l'album.
    - 404 Not Found: Si aucun commentaire n'est trouvé pour cet album.
    """
    comments = get_list_or_404(Comments, id_album=id_album)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


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
    comments = get_object_or_404(Comments, id=id)

    serializer = CommentsSerializer(comments, many=False)

    return Response({"Like" : serializer.data})

@api_view(['POST'])
def add_comment(request, id):
    """
    post:
    Ajoute un nouveau commentaire.

    Paramètres:
    - request (Request): Les données de la requête.

    Réponse:
    - 201 Created: Retourne les détails du commentaire créé.
    """
    print(request)

    return Response({"ok" : "ok"})