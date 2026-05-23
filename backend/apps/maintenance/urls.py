from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaintenanceRecordViewSet

router = DefaultRouter()
router.register(r\'maintenance\', MaintenanceRecordViewSet)

urlpatterns = [
    path(\'\', include(router.urls)),
]
