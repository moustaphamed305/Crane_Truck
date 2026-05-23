from rest_framework import serializers
from .models import Trip
from apps.trucks.serializers import TruckSerializer
from apps.drivers.serializers import DriverSerializer

class TripSerializer(serializers.ModelSerializer):
    truck_details = TruckSerializer(source=\'truck\', read_only=True)
    driver_details = DriverSerializer(source=\'driver\', read_only=True)
    
    class Meta:
        model = Trip
        fields = \'__all__\'
