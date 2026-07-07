from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username


class Level(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(unique=True)
    data = models.JSONField(help_text='JSON с конфигурацией уровня: платформы, враги, монеты, финиш')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Уровень {self.order}: {self.name}"


class GameResult(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='results')
    level = models.ForeignKey(Level, on_delete=models.CASCADE, related_name='results')
    score = models.IntegerField(default=0)
    time = models.IntegerField(help_text='Время в секундах')
    won = models.BooleanField(default=False)
    lives_left = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - Уровень {self.level.order}: {'Победа' if self.won else 'Поражение'}"