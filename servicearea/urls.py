from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^api/', include('areas.urls')),
    url(r'^', include('clientareas.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
