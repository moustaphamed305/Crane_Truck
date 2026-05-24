from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User = get_user_model()
        if not User.objects.filter(username="mouled").exists():
            User.objects.create_superuser("mouled", "mouled@example.com", "mouled1234")
            self.stdout.write("Superuser created")
