from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_users, name="get_users"),
    path('/<str:id>/', views.get_user, name="get_user"),
]