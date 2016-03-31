from django.test import TestCase
from django.core.urlresolvers import reverse
from django.core import serializers

from models import Game


class TestBase(TestCase):
    def _deserialize_list(self, data):
        ser = serializers.deserialize('json', data)
        return [item.object for item in ser]

    def _deserialize_obj(self, data):
        ser = serializers.deserialize('json', '[{}]'.format(data))
        return [item.object for item in ser][0]


class TestGamesRestView(TestBase):
    def test_get(self):
        g1 = Game.objects.create(name='test')
        g2 = Game.objects.create(name='test2')
        g3 = Game.objects.create(name='test3')
        ids = [g1.pk, g2.pk, g3.pk]

        response = self.client.get(reverse('rest_games'))
        self.assertEqual(response.status_code, 200)
        games = self._deserialize_list(response.content)

        self.assertEqual(len(games), 3)
        self.assertEqual([g.pk for g in games], ids)


class TestGameDetailRestView(TestBase):
    def test_get(self):
        Game.objects.create(name='test')
        g2 = Game.objects.create(name='test2')
        Game.objects.create(name='test3')

        response = self.client.get(reverse('rest_game_detail', args=[2]))
        self.assertEqual(response.status_code, 200)

        game = self._deserialize_obj(response.content)
        self.assertEqual(game.pk, g2.pk)


class TestIndexPage(TestCase):
    def test_index_page(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, 200)
