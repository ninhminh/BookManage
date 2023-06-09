from django.db import models
class User(models.Model):
    UserName= models.CharField(max_length=225)
    Email = models.EmailField(unique=True)
    Password = models.CharField(max_length=255)
    FullName = models.CharField(max_length=225,null=True)

    