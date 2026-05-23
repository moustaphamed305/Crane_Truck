from rest_framework import viewsets, filters
from .models import Trip
from .serializers import TripSerializer

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = [\'start_location\', \'destination\', \'status\']
    ordering_fields = [\'created_at\', \'start_time\', \'status\']
