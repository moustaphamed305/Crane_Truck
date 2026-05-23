from rest_framework import viewsets, filters
from .models import Truck
from .serializers import TruckSerializer

class TruckViewSet(viewsets.ModelViewSet):
    queryset = Truck.objects.all()
    serializer_class = TruckSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [\'plate_number\', \'model\', \'status\']
    ordering_fields = [\'created_at\', \'fuel_level\', \'status\']
