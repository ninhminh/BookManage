from django.db import models
from .Book import Book
from .User import User
class Order(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE)
    Book = models.ForeignKey(Book, on_delete=models.CASCADE)
    Date = models.DateTimeField()
    Status = models.CharField(max_length=255)
    Amount = models.IntegerField(null = True)
    Address = models.CharField(max_length=255, null = True)
    PhoneNumber = models.CharField(max_length=255, null = True)
    