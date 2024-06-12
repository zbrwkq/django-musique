from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class Users(models.Model):
    email = models.EmailField(max_length=200, unique=True, null=False, blank=False)
    password = models.CharField(max_length=128, null=False, blank=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
