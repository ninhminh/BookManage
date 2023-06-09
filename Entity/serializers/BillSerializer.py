from rest_framework import serializers
from Entity.models.Bill import Bill
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'
        