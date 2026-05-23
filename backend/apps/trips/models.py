from django.db import models

class Trip(models.Model):
    STATUS_CHOICES = [
        (\'planned\', \'Planned\'),
        (\'in_progress\', \'In Progress\'),
        (\'completed\', \'Completed\'),
        (\'cancelled\', \'Cancelled\'),
    ]
    
    truck = models.ForeignKey(\'trucks.Truck\', on_delete=models.CASCADE, related_name=\'trips\')
    driver = models.ForeignKey(\'drivers.Driver\', on_delete=models.CASCADE, related_name=\'trips\')
    
    start_location = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    
    distance = models.FloatField(default=0.0)  # in km
    fuel_used = models.FloatField(default=0.0)  # in liters
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=\'planned\')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Trip {self.id}: {self.start_location} to {self.destination}"
