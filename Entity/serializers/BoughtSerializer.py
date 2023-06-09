from rest_framework import serializers
from Entity.models.Bought import Bought
from .BookSerializer import BookSerializer
from django.core.validators import MaxValueValidator, MinValueValidator
class BoughtSerializer(serializers.ModelSerializer):
    Book = BookSerializer(many=False)
    class Meta:
        model = Bought
        fields = '__all__'
        