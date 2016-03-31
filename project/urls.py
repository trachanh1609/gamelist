from django.conf.urls import url

from . import views
from . import rest

urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^rest/games/$', rest.GamesRestView.as_view(), name='rest_games'),
    url(r'^rest/games/(?P<id>\d+)$', rest.GameDetailRestView.as_view(),
        name='rest_game_detail'),
]
