from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticated
from .models import Driver
from .serializers import DriverSerializer

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'phone', 'license_number', 'status']
    ordering_fields = ['created_at', 'name', 'status']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
