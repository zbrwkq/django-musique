from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_albums, name="get_albums"),
    path('<int:id>/', views.get_album, name="get_album")
]