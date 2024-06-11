from django.db import models

class Users(models.Model):
    email = models.EmailField(max_length=200, unique=True, null=False, blank=False)
    password = models.CharField(max_length=128, null=False, blank=False)

    def __str__(self):
        return self.name
