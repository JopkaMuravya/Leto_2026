from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Level, GameResult

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LevelListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ['id', 'name', 'description', 'order']


class LevelDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ['id', 'name', 'data']


class GameResultSerializer(serializers.ModelSerializer):
    level_name = serializers.CharField(source='level.name', read_only=True)
    level_order = serializers.IntegerField(source='level.order', read_only=True)

    class Meta:
        model = GameResult
        fields = [
            'id', 'level', 'level_name', 'level_order',
            'score', 'time', 'won', 'lives_left', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class LeaderboardSerializer(serializers.Serializer):
    username = serializers.CharField()
    total_score = serializers.IntegerField()
    levels_won = serializers.IntegerField()