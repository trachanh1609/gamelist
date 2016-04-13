from rest_framework import serializers
from project.models import Game

class GameSerializer(serializers.ModelSerializer):
	class Meta:
		model = Game
		fields = ('id','name', 'release_date', 'rating', 'comment','publisher', 'developer', 'platform','tags')
		