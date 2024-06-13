from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_follows, name="get_follows"),
    path('follows/<int:user_id>/', views.get_follows_by_user, name="get_follows_by_user"),
    path('followed/<str:id>/', views.get_followed_by_user, name="get_followed_by_user"),
    path('/<str:id>/', views.get_follow, name="get_follow"),
    path('toggle_friend/<int:user_id>/', views.toggle_friend, name="toggle_friend"),
]