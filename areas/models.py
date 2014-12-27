from django.contrib.gis.db import models
from django.contrib.auth.models import User


class Area(models.Model):
    """
    This model store all users areas using Geo Django.
    GeoDjango is used to improve search time and other GIS operations
    """
    user = models.ForeignKey(User, blank=True, null=True)
    name = models.CharField(max_length=128)
    mpoly = models.MultiPolygonField(srid=4326)
    created = models.DateTimeField(auto_now_add=True)

    objects = models.GeoManager()


    class Meta:
        ordering = ["-pk"]

    def __unicode__(self):
        return self.name