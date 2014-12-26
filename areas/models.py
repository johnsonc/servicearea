from django.contrib.gis.db import models
from django.contrib.auth.models import User


class Area(models.Model):
    """
    Area model save users areas.
    This models use GeoDjango to improve search time.
    """
    user = models.ForeignKey(User, blank=True, null=True)
    name = models.CharField(max_length=128)
    poly = models.PolygonField()
    created = models.DateTimeField(auto_now_add=True)

    objects = models.GeoManager()


    class Meta:
        ordering = ["-pk"]

    def __unicode__(self):
        return self.name