from django.conf.urls import url, include
from django.contrib.gis.geos import Point
from rest_framework import routers, serializers, viewsets
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from areas.models import Area


class AreaSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Area
        fields = ('name', 'created', 'user')
        geo_field = 'mpoly'


class AreaViewSet(viewsets.ModelViewSet):
    """
    Returns a list of all Areas in the system.
    """
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

    def get_queryset(self):
        """
        """
        queryset = Area.objects.all()
        lat = self.request.QUERY_PARAMS.get('lat', None)
        lng = self.request.QUERY_PARAMS.get('lng', None)
        if lat and lng:
            # Specify Google Maps SRID
            point = Point(float(lng), float(lat))
            queryset = queryset.filter(mpoly__contains=point)
        return queryset