from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny 
from rest_framework_simplejwt.tokens import RefreshToken
import random
import os
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from rest_framework import generics, permissions
from .models import DoctorSchedule
from rest_framework import viewsets
from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework import permissions
from core.models import AuditLog 
from .models import DoctorLicense
from .permissions import IsAdminUser 
from appointments.permissions import IsDoctorUser
from django.db.models import Count
from appointments.models import Appointment
from datetime import timedelta
from django.contrib.auth import get_user_model 
from django.core.mail import send_mail
from smtplib import SMTPException
from .models import PasswordResetOTP
from .serializers import (
    PasswordResetRequestSerializer,
    PasswordResetVerifySerializer,
    PasswordResetConfirmSerializer,
    AdminUserListSerializer, 
    AdminUserUpdateSerializer,
    AdminUserSerializer,
    DoctorRegistrationSerializer,
    UserProfileSerializer,
    DoctorScheduleSerializer,
    DoctorListSerializer,
    PatientRegistrationSerializer, 
    LoginSerializer,
    PatientListSerializer,
    DoctorLicenseSerializer
)

User = get_user_model()

class PatientRegistrationView(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        serializer = PatientRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Patient registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    

class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'full_name': user.full_name,
                'email': user.email,
                'role': user.role,
            }
        }, status=status.HTTP_200_OK)
    

class DoctorRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = DoctorRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Doctor registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            
            PasswordResetOTP.objects.filter(user=user).delete()
            otp_code = ''.join(random.choices('0123456789', k=6))
            PasswordResetOTP.objects.create(user=user, otp_code=otp_code)

        try:
            print(f"--- [INFO] Attempting to send OTP email to {email} ---")
            send_mail(
                'Password Reset OTP for Titiksha Hospitals',
                f'Your One-Time Password (OTP) for password reset is: {otp_code}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            print(f"--- [SUCCESS] Email sent successfully to {email} ---")
            return Response({"message": "OTP sent to your email address."}, status=status.HTTP_200_OK)
            
        except SMTPException as e:
                # This will catch specific email-related errors
                print(f"--- [ERROR] SMTP failed: {str(e)} ---")
                # Return a more specific error message to the user
                return Response(
                    {"error": "There was a problem with the email server. Please try again later."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        except Exception as e:
                # This catches any other unexpected error
                print(f"--- [ERROR] An unexpected error occurred during email sending: {str(e)} ---")
                return Response(
                    {"error": "An unexpected server error occurred."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetVerifyView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetVerifySerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp']
            
            try:
                reset_otp = PasswordResetOTP.objects.get(user__email=email, otp_code=otp_code)
                
                # Check if OTP is expired (e.g., 10 minutes)
                if reset_otp.created_at < timezone.now() - timedelta(minutes=10):
                    return Response({"error": "OTP has expired."}, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({"message": "OTP verified successfully."}, status=status.HTTP_200_OK)
            except PasswordResetOTP.DoesNotExist:
                return Response({"error": "Invalid OTP or email."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp']
            new_password = serializer.validated_data['new_password']

            try:
                reset_otp = PasswordResetOTP.objects.get(user__email=email, otp_code=otp_code)
                if reset_otp.created_at < timezone.now() - timedelta(minutes=10):
                    return Response({"error": "OTP has expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)

                user = reset_otp.user
                user.set_password(new_password)
                user.save()

                # OTP has been used, delete it
                reset_otp.delete()

                return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
            except PasswordResetOTP.DoesNotExist:
                return Response({"error": "Invalid OTP or email. Please start over."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DoctorListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        doctors = User.objects.filter(role='doctor')
        serializer = DoctorListSerializer(doctors, many=True)
        return Response(serializer.data)


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdminUser] 


class AdminUserListView(APIView):
    permission_classes = [IsAdminUser] 

    def get(self, request):
        users = User.objects.all().order_by('-date_joined')
        serializer = AdminUserListSerializer(users, many=True)
        return Response(serializer.data)

class AdminUserDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND

    def get(self, request, pk):
        user = self.get_object(pk)
        serializer = AdminUserListSerializer(user)
        return Response(serializer.data)

    def patch(self, request, pk):
        user = self.get_object(pk)
        serializer = AdminUserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = self.get_object(pk)
        # Instead of deleting, it's often better to deactivate
        user.is_active = False
        user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class DoctorScheduleViewSet(viewsets.ModelViewSet):
    
    queryset = DoctorSchedule.objects.all()
    serializer_class = DoctorScheduleSerializer
    permission_classes = [IsAdminUser]


class UserProfileView(generics.RetrieveUpdateAPIView):

    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated] # Any authenticated user can access this

    def get_object(self):

        return self.request.user

class AdminDashboardDataView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        # 1. Core Stats
        total_patients = User.objects.filter(role='patient').count()
        total_doctors = User.objects.filter(role='doctor', is_active=True).count()
        total_appointments = Appointment.objects.count()
        
        # 2. Appointment Trends (Last 7 Days)
        today = timezone.now().date()
        seven_days_ago = today - timedelta(days=7)
        appointment_trends_query = Appointment.objects.filter(
            appointment_date__gte=seven_days_ago
        ).values('appointment_date').annotate(count=Count('id')).order_by('appointment_date')

        # Create a dictionary for all 7 days, defaulting to 0
        trends_data = { (seven_days_ago + timedelta(days=i)).strftime('%b %d'): 0 for i in range(8) }
        for item in appointment_trends_query:
            trends_data[item['appointment_date'].strftime('%b %d')] = item['count']

        # 3. Recent Activity (last 5 audit logs)
        recent_activity = AuditLog.objects.all().order_by('-timestamp')[:5]
        activity_data = [
            {
                "action": log.action,
                "user": log.user.full_name if log.user else "System",
                "timestamp": log.timestamp
            } for log in recent_activity
        ]

        # 4. Doctors on Duty Today
        doctors_with_appointments_today = User.objects.filter(
            doctor_appointments__appointment_date=today,
            doctor_appointments__status='Confirmed'
        ).distinct()
        doctors_on_duty_data = [
            { "name": doc.full_name, "specialization": doc.specialization } for doc in doctors_with_appointments_today
        ]

        data = {
            'totalPatients': total_patients,
            'totalDoctors': total_doctors,
            'totalAppointments': total_appointments,
            'appointmentTrends': {
                "labels": list(trends_data.keys()),
                "data": list(trends_data.values())
            },
            'recentActivity': activity_data,
            'doctorsOnDuty': doctors_on_duty_data,
        }
        return Response(data)


class DoctorPatientListView(APIView):
    permission_classes = [IsDoctorUser]

    def get(self, request):
        doctor = request.user
        
        patient_ids = Appointment.objects.filter(doctor=doctor).values_list('patient_id', flat=True).distinct()
        
        patients = User.objects.filter(id__in=patient_ids)
        
        serializer = PatientListSerializer(patients, many=True)
        return Response(serializer.data)

class DoctorLicenseViewSet(viewsets.ModelViewSet):
    """
    A viewset for Admins to view and manage Doctor Licenses.
    """
    queryset = DoctorLicense.objects.all().order_by('license_number')
    serializer_class = DoctorLicenseSerializer
    permission_classes = [IsAdminUser]


# class CreateAdminUserView(APIView):
#     # Allow anyone to access this specific URL for the one-time setup.
#     permission_classes = [AllowAny]

#     def get(self, request):
#         # Read the admin credentials from environment variables
#         admin_email = os.environ.get('ADMIN_EMAIL')
#         admin_password = os.environ.get('ADMIN_PASSWORD')
#         admin_full_name = os.environ.get('ADMIN_FULL_NAME', 'Admin')

#         # Check if the required variables are set
#         if not admin_email or not admin_password:
#             return Response(
#                 {"error": "ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set on Render."},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

#         # Check if the admin user already exists
#         if User.objects.filter(email=admin_email).exists():
#             return Response(
#                 {"message": f"Admin user with email {admin_email} already exists."},
#                 status=status.HTTP_200_OK
#             )

#         # If the user does not exist, create them
#         try:
#             User.objects.create_superuser(
#                 email=admin_email,
#                 password=admin_password,
#                 full_name=admin_full_name
#             )
#             return Response(
#                 {"message": f"SUCCESS: Admin user {admin_email} created. You should now remove this URL endpoint."},
#                 status=status.HTTP_201_CREATED
#             )
#         except Exception as e:
#             return Response(
#                 {"error": f"An error occurred while creating the admin user: {str(e)}"},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
