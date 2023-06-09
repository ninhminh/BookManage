from django.db import models
from .User import User
from .Book import Book
from django.core.validators import MaxValueValidator, MinValueValidator
class Rate(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE,related_name="userbook")
    Book = models.ForeignKey(Book, on_delete=models.CASCADE,related_name="bookuser")
    Rate= models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )