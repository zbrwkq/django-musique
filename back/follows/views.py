from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth.models import User

from .serializers import FollowsSerializer
from .models import Follows

# Create your views here.


@api_view(['GET'])
def get_follows(request):
    """
    get:
    Retourne la liste de tous les suivis.

    Réponse:
    - 200 OK: Retourne une liste des suivis.
    """
    follows = Follows.objects.all()

    serializer = FollowsSerializer(follows, many=True)

    return Response({"Follows" : serializer.data})


@api_view(['GET'])
def get_follows_by_user(request, user_id):
    """
    get:
    Retourne la liste des suivis pour un utilisateur spécifique.

    Paramètres:
    - user_id (int): L'ID de l'utilisateur.

    Réponse:
    - 200 OK: Retourne une liste des suivis de l'utilisateur.
    - 404 Not Found: Si aucun suivi n'est trouvé pour cet utilisateur.
    """
    follows = get_list_or_404(Follows, id_user=user_id)

    serializer = FollowsSerializer(follows, many=True)

    return Response({"Follows" : serializer.data})

@api_view(['GET'])
def get_followed_by_user(request, id_follow):
    """
    get:
    Retourne la liste des utilisateurs suivis par un utilisateur spécifique.

    Paramètres:
    - id_follow (int): L'ID de l'utilisateur suivi.

    Réponse:
    - 200 OK: Retourne une liste des utilisateurs suivis par l'utilisateur.
    - 404 Not Found: Si aucun utilisateur suivi n'est trouvé pour cet utilisateur.
    """
    follows = get_list_or_404(Follows, id_follow=id_follow)

    serializer = FollowsSerializer(follows, many=True)

    return Response({"Follows" : serializer.data})


@api_view(['GET'])
def get_follow(request, id):
    """
    get:
    Retourne les détails d'une relation de suivi spécifique.

    Paramètres:
    - id (int): L'ID de la relation de suivi.

    Réponse:
    - 200 OK: Retourne les détails de la relation de suivi.
    - 404 Not Found: Si la relation de suivi n'est pas trouvée.
    """
    follows = get_object_or_404(Follows, id=id)

    serializer = FollowsSerializer(follows, many=False)

    return Response({"Follow" : serializer.data})

@api_view(['POST'])
def toggle_friend(request, user_id):
    """
    post:
    Ajoute ou supprime un utilisateur comme ami.

    Paramètres:
    - user_id (int): L'ID de l'utilisateur ami.

    Réponse:
    - 200 OK: Si l'opération a réussi, retourne un message indiquant l'ajout ou la suppression de l'ami.
    - 401 Unauthorized: Si l'utilisateur n'est pas authentifié.
    - 500 Internal Server Error: Si une erreur interne se produit lors de l'ajout ou de la suppression de l'ami.
    """
    try:
        current_user_id = request.user.id
        if not current_user_id:
            return Response({'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        friend_user_id = user_id

        follow, created = Follows.objects.get_or_create(id_user=current_user_id, id_follow=friend_user_id)

        if created:
            message = 'Ami ajouté'
        else:
            follow.delete()
            message = 'Ami supprimé'

        return Response({'message': message}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)