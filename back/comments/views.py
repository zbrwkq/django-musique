from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

from .serializers import CommentsSerializer
from .models import Comments


@api_view(['GET'])
def get_comments(request):
    comments = Comments.objects.all()

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_user(request, id_user):
    comments = get_list_or_404(Comments, id_user=id_user)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_track(request, id_track):
    comments = get_list_or_404(Comments, id_track=id_track)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_artist(request, id_artist):
    comments = get_list_or_404(Comments, id_artist=id_artist)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_album(request, id_album):
    comments = get_list_or_404(Comments, id_album=id_album)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comment(request, id):
    comments = get_object_or_404(Comments, id=id)

    serializer = CommentsSerializer(comments, many=False)

    return Response({"Like" : serializer.data})

@api_view(['POST'])
def add_comment(request, id):
    print(request)

    return Response({"ok" : "ok"})