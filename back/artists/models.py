from django.db import models

class Artists(models.Model):
    name = models.CharField(max_length=200, default="", blank=False)
    spotify_id = models.CharField(max_length=200, default="", blank=False)
    photo_url = models.URLField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.name
