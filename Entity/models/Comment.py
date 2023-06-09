from django.db import models
from .User import User
from .Book import Book
from django.core.validators import MaxValueValidator, MinValueValidator
class Comment(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE,related_name="usercomment")
    Book = models.ForeignKey(Book, on_delete=models.CASCADE,related_name="bookcomment")
    Comment =models.CharField(max_length=225)
    CommentParent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='replies')