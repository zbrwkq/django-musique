from django.db import models

class Albums(models.Model):
    name = models.CharField(max_length=200, default="", blank=False)
    photo_url = models.URLField(max_length=200, blank=True, null=True)
    artist = models.CharField(max_length=200, default="", blank=False)
    id_artist = models.CharField(max_length=200, default="", blank=False)

    def __str__(self):
        return self.name
