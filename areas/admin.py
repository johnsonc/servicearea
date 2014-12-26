from django.contrib import admin
from areas import models


class AreaAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'created')
    search_fields = ('user', 'name')
    list_filter = ['created']

admin.site.register(models.Area, AreaAdmin)
