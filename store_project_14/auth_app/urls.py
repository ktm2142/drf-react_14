from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegistrationAPIView, UserProfileAPIView


urlpatterns = [
    path('registration/', RegistrationAPIView.as_view(), name='registration'),
    path('token/obtain/', TokenObtainPairView.as_view(), name='token_obtain'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user_profile/', UserProfileAPIView.as_view(), name='user_profile'),
]