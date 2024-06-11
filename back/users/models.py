from django.db import models

class Users(models.Model):
    email = models.CharField(max_length=200, unique=True, null=False, email=True, blank=False)
    password = models.CharField(null=False, blank=False, password=True)
