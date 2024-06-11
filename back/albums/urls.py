from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_albums, name="get_albums"),
    path('<str:id>/', views.get_album, name="get_album")
]