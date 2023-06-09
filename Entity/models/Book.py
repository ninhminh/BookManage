from django.db import models
from django.core.exceptions import ValidationError
from .Category import Category
class Book(models.Model):
    BookName = models.CharField(max_length=255)
    Releasedate =models.DateField()
    ContentBook = models.TextField()
    PageNumber = models.IntegerField()
    Price = models.FloatField()
    BookImage = models.CharField(max_length=225)
    Author = models.CharField(max_length=225)
    Category = models.ForeignKey(Category,on_delete=models.CASCADE)
    def clean_Price(self):
        if self.Price <= 0:
            raise ValidationError("Giá trị của Price phải lớn hơn 0")