from rest_framework import serializers
from Entity.models.Comment import Comment

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        