from rest_framework import serializers
from Entity.models.Rate import Rate
from django.core.validators import MaxValueValidator, MinValueValidator
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = '__all__'
        