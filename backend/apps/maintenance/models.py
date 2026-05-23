from django.db import models

class MaintenanceRecord(models.Model):
    TYPE_CHOICES = [
        ('routine', 'Routine Check'),
        ('repair', 'Repair'),
        ('inspection', 'Inspection'),
        ('oil_change', 'Oil Change'),
        ('tire_replacement', 'Tire Replacement'),
    ]
    
    truck = models.ForeignKey('trucks.Truck', on_delete=models.CASCADE, related_name='maintenance_records')
    maintenance_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    description = models.TextField(blank=True)
    
    scheduled_date = models.DateField()
    completion_date = models.DateField(null=True, blank=True)
    
    cost = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.truck.plate_number} - {self.maintenance_type} ({self.scheduled_date})"

