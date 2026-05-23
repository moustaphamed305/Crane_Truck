from django.db import models

class Truck(models.Model):
    STATUS_CHOICES = [
        (\'available\', \'Available\'),
        (\'in_trip\', \'In Trip\'),
        (\'maintenance\', \'Maintenance\'),
        (\'out_of_service\', \'Out of Service\'),
    ]
    
    plate_number = models.CharField(max_length=20, unique=True)
    model = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=\'available\')
    fuel_level = models.FloatField(default=100.0)  # Percentage
    
    # Real-time tracking data
    gps_latitude = models.FloatField(null=True, blank=True)
    gps_longitude = models.FloatField(null=True, blank=True)
    speed = models.FloatField(default=0.0)
    heading = models.FloatField(default=0.0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.plate_number} - {self.model}"
