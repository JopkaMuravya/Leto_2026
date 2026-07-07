from django.contrib import admin
from .models import User, Level, GameResult

admin.site.register(User)
admin.site.register(Level)
admin.site.register(GameResult)