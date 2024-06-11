from rest_framework import serializers
from .models import Follows

class FollowsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follows
        fields = '__all__'