from django.db import models

class Likes(models.Model):
    id_user = models.IntegerField(blank=False, null=False)
    id_album = models.IntegerField(blank=True, null=True)
    id_artist = models.IntegerField(blank=True, null=True)
    id_track = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return f"Like de l'utilisateur {self.id_user} sur l'album {self.id_album}"

    @classmethod
    def toggle_like(cls, user_id, album_id):
        existing_like = cls.objects.filter(id_user=user_id, id_album=album_id).first()

        if existing_like:
            existing_like.delete()
            return False
        else:
            cls.objects.create(id_user=user_id, id_album=album_id)
            return True

    @classmethod
    def toggle_like_artist(cls, user_id, id_artist):
        existing_like = cls.objects.filter(id_user=user_id, id_artist=id_artist).first()
        print(user_id)
        print(id_artist)
        print(existing_like)
        if existing_like:
            existing_like.delete()
            return False
        else:
            cls.objects.create(id_user=user_id, id_artist=id_artist)
            return True
        
    @classmethod
    def toggle_like_track(cls, user_id, track_id):
        existing_like = cls.objects.filter(id_user=user_id, id_track=track_id).first()

        if existing_like:
            existing_like.delete()
            return False
        else:
            cls.objects.create(id_user=user_id, id_track=track_id)
            return True
