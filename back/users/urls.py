from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_users, name="get_users"),
    path('/<str:id>/', views.get_user, name="get_user"),
    path('login/', views.login, name="login"),
    path('register/', views.register, name="register"),
]