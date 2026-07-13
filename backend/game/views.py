from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import connection
from django.contrib.auth import get_user_model
from .models import Level, GameResult
from .serializers import (
    UserSerializer, RegisterSerializer, LevelListSerializer,
    LevelDetailSerializer, GameResultSerializer, LeaderboardSerializer
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class LevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Level.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return LevelDetailSerializer
        return LevelListSerializer


class GameResultViewSet(viewsets.ModelViewSet):
    serializer_class = GameResultSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return GameResult.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def leaderboard(self, request):
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT 
                    u.username,
                    COALESCE(SUM(best_scores.best), 0) AS total_score,
                    COUNT(best_scores.level_id) AS levels_won
                FROM game_user u
                LEFT JOIN (
                    SELECT user_id, level_id, MAX(score) AS best
                    FROM game_gameresult
                    WHERE won = TRUE
                    GROUP BY user_id, level_id
                ) best_scores ON u.id = best_scores.user_id
                GROUP BY u.id, u.username
                ORDER BY total_score DESC, levels_won DESC
                LIMIT 100
            """)
            rows = cursor.fetchall()

        leaderboard = [
            {'username': row[0], 'total_score': row[1], 'levels_won': row[2]}
            for row in rows
        ]

        serializer = LeaderboardSerializer(leaderboard, many=True)
        return Response(serializer.data)