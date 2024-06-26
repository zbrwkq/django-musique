from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_artists, name="get_artists"),
    path('<str:id>/', views.get_artist, name="get_artist"),
    path('get/<str:id>/', views.get_artist_by_id, name="get_artist_by_id")
]