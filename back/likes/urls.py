from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_likes, name="get_likes"),
    path('track/<str:id>/', views.get_likes_by_track, name="get_likes_by_track"),
    path('artist/<str:id>/', views.get_likes_by_artist, name="get_likes_by_artist"),
    path('/album/<str:id>/', views.get_likes_by_album, name="get_likes_by_album"),
    path('/<str:id>/', views.get_like, name="get_like"),
]