from rest_framework import serializers
from Entity.models.UserRole import UserRole
class UserRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRole
        fields = '__all__'
        