from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_tracks, name="get_tracks"),
    path('/<str:id>/', views.get_track, name="get_track"),
]