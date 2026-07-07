from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from game.views import RegisterView, MeView, LevelViewSet, GameResultViewSet

router = DefaultRouter()
router.register(r'levels', LevelViewSet, basename='level')
router.register(r'results', GameResultViewSet, basename='result')

urlpatterns = [
    path('admin/', admin.site.urls),

    # Авторизация
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='refresh'),

    # Пользователь
    path('api/users/me/', MeView.as_view(), name='me'),

    # API
    path('api/', include(router.urls)),
]