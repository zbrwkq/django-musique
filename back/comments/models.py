from django.db import models
import datetime

class Comments(models.Model):
    id_user = models.IntegerField(default=0, null=False)
    rating = models.IntegerField(default=0, null=False)
    comment = models.CharField(max_length=1000, default="", blank=True, null=True)
    id_album = models.IntegerField(blank=True, null=True)
    id_artist = models.IntegerField(blank=True, null=True)
    id_track = models.IntegerField(blank=True, null=True)
    date = models.DateField(blank=False, null=False, default=datetime.date.today)

    def __str__(self):
        return self.name

