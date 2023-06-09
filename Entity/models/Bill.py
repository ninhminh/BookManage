from django.db import models
class Bill(models.Model):
    StatusBill = models.CharField(max_length=225)
    DeliveryTime = models.DateTimeField(null=True, blank=True)
    DeliveryDestination =models.CharField(max_length=225)