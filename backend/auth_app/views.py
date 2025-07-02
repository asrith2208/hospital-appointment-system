
from rest_framework import generics, status, views
from rest_framework.response import Response
from .serializers import (
    PatientRegisterSerializer, DoctorRegisterSerializer, LoginSerializer,
    PasswordResetRequestSerializer, PasswordResetVerifySerializer, PasswordResetConfirmSerializer
)
from users.models import User
from core.models import OTP
from rest_framework_simplejwt.tokens import RefreshToken
import random
from django.core.mail import send_mail
from django.conf import settings

class PatientRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = PatientRegisterSerializer

class DoctorRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = DoctorRegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'email': user.email,
                'full_name': user.get_full_name(),
                'role': user.role
            }
        })

def send_otp_email(user, otp_code):
    send_mail(
        subject='Your Password Reset OTP',
        message=f'Your OTP for password reset is: {otp_code}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False,
    )

class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        user = User.objects.get(email=email)
        
        otp_code = str(random.randint(100000, 999999))
        OTP.objects.create(user=user, otp=otp_code)
        
        send_otp_email(user, otp_code)
        
        return Response({"message": "OTP has been sent to your email."}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        
        try:
            user = User.objects.get(email=data['email'])
            otp_obj = OTP.objects.filter(user=user, otp=data['otp']).latest('created_at')
            # Here you might want to add a time validation for the OTP
            
            user.set_password(data['password'])
            user.save()
            
            # Invalidate the OTP after use
            OTP.objects.filter(user=user).delete()
            
            return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        except (User.DoesNotExist, OTP.DoesNotExist):
            return Response({"error": "Invalid OTP or email."}, status=status.HTTP_400_BAD_REQUEST)