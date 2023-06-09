from rest_framework import serializers
from Entity.models.Bought import Bought
from django.core.validators import MaxValueValidator, MinValueValidator
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bought
        fields = '__all__'
        