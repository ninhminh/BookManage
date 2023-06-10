from rest_framework import serializers
from Entity.models.Order import Order
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        