from rest_framework import serializers
from Entity.models.Category import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

        
        