from rest_framework import serializers
from .models import Driver
from apps.trucks.serializers import TruckSerializer

class DriverSerializer(serializers.ModelSerializer):
    assigned_truck_details = TruckSerializer(source=\'assigned_truck\', read_only=True)
    
    class Meta:
        model = Driver
        fields = \'__all__\'
