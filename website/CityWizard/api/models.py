from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from django.utils import timezone
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    email = models.CharField(max_length=100, null=True, blank=True)
    password = models.CharField(max_length=50, null=True, blank=True)
    previous_searches = models.CharField(
        max_length=1000, null=True, blank=True)
    saved_cities = models.CharField(max_length=1000, null=True, blank=True)
    token = models.CharField(max_length=1000, blank=True, null=True)
