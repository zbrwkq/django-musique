from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_comments, name="get_comments"),
    path('user/<str:id>/', views.get_comments_by_user, name="get_comments_by_user"),
    path('track/<str:id>/', views.get_comments_by_track, name="get_comments_by_track"),
    path('artist/<str:id>/', views.get_comments_by_artist, name="get_comments_by_artist"),
    path('album/<str:id>/', views.get_comments_by_album, name="get_comments_by_album"),
    path('/<str:id>/', views.get_comment, name="get_comment"),
    path('add/', views.add_comment, name="add_comment"),
    path('delete/<str:id>/', views.delete_comment, name="delete_comment"),
]