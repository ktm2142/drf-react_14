from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import CustomUser
from .serializers import RegistrationSerializer, UserProfileSerializer


class RegistrationAPIView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer

    def perform_create(self, serializer):
        validated_data = serializer.validated_data
        validated_data.pop('password_2')
        CustomUser.objects.create_user(**validated_data)


class UserProfileAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user