from django.db import models

class Follows(models.Model):
    id_user = models.IntegerField(default=0, null=False)
    id_follow = models.IntegerField(default=0, null=False)

    def __str__(self):
        return self.name

