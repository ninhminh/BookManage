from rest_framework import serializers
from Entity.models.Book import Book
from .CategorySerializer import CategorySerializer
class BookSerializer(serializers.ModelSerializer):
    Category = CategorySerializer(many=False)
    class Meta:
        model = Book
        fields = '__all__'
        