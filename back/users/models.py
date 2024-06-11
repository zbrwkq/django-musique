from django.db import models

class Users(models.Model):
    email = models.EmailField(max_length=200, unique=True, null=False, blank=False)
    password = models.CharField(null=False, blank=False, password=True)

    def __str__(self):
        return self.name
