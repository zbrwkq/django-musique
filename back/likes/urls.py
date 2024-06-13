from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_likes, name="get_likes"),
    path('track/<str:id>/', views.get_likes_by_track, name="get_likes_by_track"),
    path('artist/<str:id>/', views.get_likes_by_artist, name="get_likes_by_artist"),
    path('album/<str:id>/', views.get_likes_by_album, name="get_likes_by_album"),
    path('<str:id>/', views.get_like, name="get_like"),
    path('like/<int:album_id>/', views.like_album, name="like_album"),
    path('like_artist/<int:id_artist>/', views.like_artist, name="like_artist"),
    path('like_track/<int:track_id>/', views.like_track, name="like_track"),
    path('user/artists/<int:id_user>/', views.get_artists_likes_by_user, name="get_artists_likes_by_user"),
    path('user/albums/<int:id_user>/', views.get_albums_likes_by_user, name="get_albums_likes_by_user"),
    path('user/tracks/<int:id_user>/', views.get_tracks_likes_by_user, name="get_tracks_likes_by_user"),
]
