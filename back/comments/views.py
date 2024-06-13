from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.views.decorators.http import require_http_methods
from django.shortcuts import render

from .serializers import CommentsSerializer
from .models import Comments

from albums.views import get_album_by_id_spotify 

@api_view(['GET'])
def get_comments(request):
    comments = Comments.objects.all()

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_user(request, id_user):
    comments = Comments.objects.filter(id_user=id_user)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_track(request, id_track):
    comments = Comments.objects.filter(id_track=id_track)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_artist(request, id_artist):
    comments = Comments.objects.filter(id_artist=id_artist)

    serializer = CommentsSerializer(comments, many=True)

    return Response({"Comments" : serializer.data})


@api_view(['GET'])
def get_comments_by_album(request, id):
    try:
        id = int(id)
    except ValueError:
        id = get_album_by_id_spotify(id).get('id')

    comments = Comments.objects.filter(id_album=id)

    serializer = CommentsSerializer(comments, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def get_comment(request, id):
    comment = get_object_or_404(Comments, id=id)

    serializer = CommentsSerializer(comment, many=False)

    return Response({"Comment" : serializer.data})

@require_http_methods(["GET", "POST"])
@api_view(['POST'])
def add_comment(request):
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