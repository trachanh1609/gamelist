import json
from django.views.generic import View
from django.http import HttpResponse
from django.core import serializers

from .models import Game


class RestView(View):
    def _serialize(self, data):
        return serializers.serialize('json', data)

    def _response(self, data):
        return HttpResponse(content=data, content_type="application/json")


class GamesRestView(RestView):
    def get(self, request, *args, **kwargs):
        data = self._serialize(Game.objects.all())
        return self._response(data)


class GameDetailRestView(RestView):
    def get(self, request, *args, **kwargs):
        game = Game.objects.get(id=kwargs.get('id'))
        data = self._serialize((game,))
        data = json.dumps(json.loads(data)[0])
        return self._response(data)
