from rest_framework import serializers
from .models import MaintenanceRecord
from apps.trucks.serializers import TruckSerializer

class MaintenanceRecordSerializer(serializers.ModelSerializer):
    truck_details = TruckSerializer(source='truck', read_only=True)
    
    class Meta:
        model = MaintenanceRecord
        fields = '__all__'

