from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_tracks, name="get_tracks"),
    path('<str:id>/', views.get_track, name="get_track"),
    path('preview/<str:id>/', views.get_tracks_preview, name="get_tracks_preview"),
    path('get/<str:id>/', views.get_track_by_id, name="get_track_by_id"),
]