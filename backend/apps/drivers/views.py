from rest_framework import viewsets, filters
from .models import Driver
from .serializers import DriverSerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [\'name\', \'phone\', \'license_number\', \'status\']
    ordering_fields = [\'created_at\', \'name\', \'status\']
