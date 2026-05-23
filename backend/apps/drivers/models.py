from django.db import models
from django.conf import settings

class Driver(models.Model):
    STATUS_CHOICES = [
        (\'active\', \'Active\'),
        (\'inactive\', \'Inactive\'),
        (\'on_leave\', \'On Leave\'),
    ]
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name=\'driver_profile\')
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    license_number = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=\'active\')
    
    # One driver can be assigned to one truck (as per requirements)
    assigned_truck = models.OneToOneField(
        \'trucks.Truck\', 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name=\'assigned_driver\'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
