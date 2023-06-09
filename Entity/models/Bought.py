from django.db import models
from .User import User
from .Book import Book
from .Bill import Bill
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
class Bought(models.Model):
    User = models.ForeignKey(User, on_delete=models.CASCADE,related_name="userbought")
    Book = models.ForeignKey(Book, on_delete=models.CASCADE,related_name="bookbought")
    Quantity =models.IntegerField(validators=[MinValueValidator(1)])
    StatusBuy = models.CharField(max_length=225)
   
    Bill = models.ForeignKey(Bill,on_delete=models.CASCADE,related_name="billbought",null=True,blank=True)
    