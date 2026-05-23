from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ADMIN = \'admin\'
    MANAGER = \'manager\'
    DRIVER = \'driver\'
    
    ROLE_CHOICES = [
        (ADMIN, \'Admin\'),
        (MANAGER, \'Manager\'),
        (DRIVER, \'Driver\'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=DRIVER)
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"
