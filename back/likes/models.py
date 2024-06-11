from django.db import models

class Likes(models.Model):
    id_user = models.IntegerField(blank=False, null=False)
    id_album = models.IntegerField(blank=True, null=True)
    id_artist = models.IntegerField(blank=True, null=True)
    id_track = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name

