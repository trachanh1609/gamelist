from django.contrib import admin
from .models import Game, Platform, Publisher, Developer, Tag

admin.site.register(Game)
admin.site.register(Platform)
admin.site.register(Publisher)
admin.site.register(Developer)
admin.site.register(Tag)
