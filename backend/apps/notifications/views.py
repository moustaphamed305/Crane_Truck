from rest_framework import viewsets, filters
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'message']
    ordering_fields = ['created_at', 'is_read']

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)

