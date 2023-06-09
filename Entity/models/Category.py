from django.db import models
from django.core.exceptions import ValidationError
class Category(models.Model):
    CategoryName = models.CharField(max_length=255,unique=True)
