from django.conf.urls import url, include
from rest_framework import routers, serializers, viewsets
from areas.models import Area

# Serializers define the API representation.
class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ('name', 'poly', 'created', 'user')


# ViewSets define the view behavior.
class AreaViewSet(viewsets.ModelViewSet):
    """
    Returns a list of all Areas in the system.
    """
    queryset = Area.objects.all()
    serializer_class = AreaSerializer
