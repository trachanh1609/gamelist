from django.conf.urls import url, include, patterns
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from . import rest


urlpatterns = [
    url(r'^$', views.IndexView.as_view(), name='index'),
    url(r'^rest/games/$', rest.GamesRestView.as_view(), name='rest_games'),
    url(r'^rest/games/(?P<id>\d+)$', rest.GameDetailRestView.as_view(),
        name='rest_game_detail'),
    url(r'^games/$', views.game_list),
    url(r'^games/(?P<pk>[0-9]+)/$', views.game_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
