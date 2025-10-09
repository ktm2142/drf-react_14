from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(
        max_length=15,
        blank=True,
        validators=[
            RegexValidator(
                r'^\+?\d{5,15}$',
                'Invalid phone number'
            )
        ]
    )
    city = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=150, blank=True)

