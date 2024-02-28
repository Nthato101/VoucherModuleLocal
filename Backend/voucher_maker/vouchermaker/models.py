from django.db import models


# Create your models here.

class Voucher(models.Model):
    redemptions = models.IntegerField(default=0)
    created_at = models.DateField(auto_now_add=True)
    expires_at = models.DateField(null=True)
    pin = models.CharField(max_length=4, unique=True,null=True)
    status = models.CharField(default='created', max_length=50)

    def __str__(self):
        return f'{self.id} - {self.status}'
