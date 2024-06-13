from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from django.shortcuts import render

from .serializers import UsersSerializer
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.


@api_view(['GET'])
def get_users(request):
    """
    get:
    Retourne la liste de tous les utilisateurs, à l'exclusion de l'utilisateur courant.

    Réponse:
    - 200 OK: Retourne une liste des utilisateurs.
    """
    current_user_id = request.user.id
    users = User.objects.exclude(id=current_user_id)
    
    serializer = UsersSerializer(users, many=True)
    return Response({"Users": serializer.data})


@api_view(['GET'])
def get_user(request, id):
    """
    get:
    Retourne les détails d'un utilisateur spécifique.

    Paramètres:
    - id (int): L'ID de l'utilisateur.

    Réponse:
    - 200 OK: Retourne les détails de l'utilisateur.
    - 404 Not Found: Si l'utilisateur n'est pas trouvé.
    """
    users = get_object_or_404(User, id=id)

    serializer = UsersSerializer(users, many=False)

    return Response({"User" : serializer.data})


@api_view(['POST'])
def register(request):
    """
    post:
    Enregistre un nouvel utilisateur et retourne les jetons JWT.

    Réponse:
    - 201 Created: Utilisateur créé avec succès et retourne les jetons.
    - 400 Bad Request: Erreurs de validation.
    """
    if request.method == 'POST':
        serializer = UsersSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            data = {
                'refresh': str(token),
                'access': str(token.access_token),
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    