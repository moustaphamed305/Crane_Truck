from rest_framework import viewsets, filters
from .models import MaintenanceRecord
from .serializers import MaintenanceRecordSerializer

class MaintenanceRecordViewSet(viewsets.ModelViewSet):
    queryset = MaintenanceRecord.objects.all()
    serializer_class = MaintenanceRecordSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['maintenance_type', 'description']
    ordering_fields = ['scheduled_date', 'cost', 'created_at']

