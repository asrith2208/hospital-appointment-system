# backend/appointments/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from datetime import datetime, time, timedelta, date
from .models import Appointment
from .permissions import IsDoctorUser, IsPatientUser, IsAdminUser
from django.utils import timezone
from users.models import DoctorSchedule
from rest_framework.generics import ListAPIView
from rest_framework.decorators import action
from users.models import User
from rest_framework import viewsets
from utils.email_utils import send_appointment_confirmation_email
from .serializers import (
    DoctorAppointmentListSerializer, 
    AppointmentStatusUpdateSerializer,
    AdminAppointmentSerializer,
    DoctorAppointmentSerializer,
    AppointmentStatusUpdateSerializer,
    AppointmentDetailSerializer,
    PatientHistoryAppointmentSerializer,
    AppointmentListSerializer,
    AppointmentCreateSerializer
)

class DepartmentListView(APIView):

    def get(self, request, format=None):
        departments = [
            {'id': 1, 'name': 'Cardiology', 'description': 'Heart and blood vessel specialists.'},
            {'id': 2, 'name': 'Neurology', 'description': 'Treatment of nervous system disorders.'},
            {'id': 3, 'name': 'Orthopedics', 'description': 'Care for bones, joints, and muscles.'},
            {'id': 4, 'name': 'Pediatrics', 'description': 'Medical care for infants and children.'},
        ]
        return Response(departments, status=status.HTTP_200_OK)
    
class DoctorAvailabilityView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        doctor_id = request.query_params.get('doctor_id')
        date_str = request.query_params.get('date')

        if not doctor_id or not date_str:
            return Response({"error": "doctor_id and date are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            appointment_date = datetime.strptime(date_str, '%Y-%m-%d').date()
            doctor = User.objects.get(id=doctor_id, role='doctor')
        except (ValueError, User.DoesNotExist):
            return Response({"error": "Invalid doctor_id or date format."}, status=status.HTTP_400_BAD_REQUEST)
        day_of_week = appointment_date.weekday()

        try:
            schedule = DoctorSchedule.objects.get(doctor=doctor, day_of_week=day_of_week)
            start_time = schedule.start_time
            end_time = schedule.end_time
        except DoctorSchedule.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)

        booked_times = set(
            Appointment.objects.filter(
                doctor=doctor, appointment_date=appointment_date,
                status__in=['Pending', 'Confirmed']
            ).values_list('appointment_time', flat=True)
        )
        
        available_slots = []
        slot_interval = 30
        current_slot_dt = datetime.combine(appointment_date, start_time)
        end_dt = datetime.combine(appointment_date, end_time)

        while current_slot_dt < end_dt:
            slot_as_time_obj = current_slot_dt.time()
            if slot_as_time_obj not in booked_times:
                available_slots.append(slot_as_time_obj.strftime('%H:%M'))
            current_slot_dt += timedelta(minutes=slot_interval)
            
        return Response(available_slots, status=status.HTTP_200_OK)

class AppointmentCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = AppointmentCreateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class AppointmentCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = AppointmentCreateSerializer 

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            appointment = serializer.save() 
            
          
            try:
                send_appointment_confirmation_email(appointment)
            except Exception as e:
                print(f"Error sending appointment confirmation email: {e}")

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpcomingAppointmentsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        
        appointments = Appointment.objects.filter(
            patient=request.user,
            appointment_date__gte=date.today(),
            status__in=['Pending', 'Confirmed']
        ).order_by('appointment_date', 'appointment_time')
        
        serializer = AppointmentListSerializer(appointments, many=True)
        return Response(serializer.data)


class AppointmentHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        appointments = Appointment.objects.filter(
            patient=request.user
        ).order_by('-appointment_date', '-appointment_time')
        
        serializer = AppointmentListSerializer(appointments, many=True)
        return Response(serializer.data)
    
class DoctorAppointmentsListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        appointments = Appointment.objects.filter(
            doctor=request.user
        ).order_by('-appointment_date', '-appointment_time')
        
        serializer = DoctorAppointmentListSerializer(appointments, many=True)
        return Response(serializer.data)

class AppointmentStatusUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            appointment = Appointment.objects.get(pk=pk, doctor=request.user)
        except Appointment.DoesNotExist:
            return Response({"error": "Appointment not found or you don't have permission."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = AppointmentStatusUpdateSerializer(appointment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AppointmentViewSet(viewsets.ModelViewSet):

    serializer_class = DoctorAppointmentSerializer
    permission_classes = [IsDoctorUser]

    def get_queryset(self):

        user = self.request.user
        # Filter appointments where the doctor is the current user
        return Appointment.objects.filter(doctor=user).order_by('-appointment_date', '-appointment_time')

    def get_serializer_class(self):

        if self.action in ['update', 'partial_update']:
            return AppointmentStatusUpdateSerializer
        return DoctorAppointmentSerializer

class PatientAppointmentHistoryView(ListAPIView):

    serializer_class = PatientHistoryAppointmentSerializer
    permission_classes = [IsPatientUser]

    def get_queryset(self):

        user = self.request.user
        # Filter appointments where the patient is the current user
        return Appointment.objects.filter(patient=user).order_by('-appointment_date', '-appointment_time')
    

class DoctorDashboardView(APIView):

    permission_classes = [IsDoctorUser]

    def get(self, request, format=None):
        doctor = request.user
        today = timezone.now().date()
        current_time = timezone.now().time()

        todays_appointments = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=today,
            status__in=['Pending', 'Confirmed']
        ).order_by('appointment_time')

        upcoming_appointments_qs = todays_appointments.filter(appointment_time__gte=current_time)

        total_today = todays_appointments.count()
        
        upcoming_serializer = DoctorAppointmentSerializer(upcoming_appointments_qs[:5], many=True)

        dashboard_data = {
            'stats': {
                'total_today': total_today,
                'completed_today': todays_appointments.count() - upcoming_appointments_qs.count(),
            },
            'upcoming_appointments': upcoming_serializer.data,
        }
        
        return Response(dashboard_data)
    
    
class PatientDashboardView(APIView):
    permission_classes = [IsPatientUser]

    def get(self, request, format=None):
        patient = request.user
        today = timezone.now().date()

        upcoming_appointments_qs = Appointment.objects.filter(
            patient=patient,
            appointment_date__gte=today,
            status='Confirmed'
        ).order_by('appointment_date', 'appointment_time')

        serializer = PatientHistoryAppointmentSerializer(upcoming_appointments_qs[:3], many=True)

        dashboard_data = {
            'upcoming_appointments': serializer.data
        }
        
        return Response(dashboard_data)
    
class AppointmentViewSet(viewsets.ModelViewSet):
 
    serializer_class = DoctorAppointmentSerializer
    permission_classes = [IsDoctorUser]

    def get_queryset(self):

        user = self.request.user
        # Filter appointments where the doctor is the current user
        return Appointment.objects.filter(doctor=user).order_by('-appointment_date', '-appointment_time')

    def get_serializer_class(self):

        if self.action in ['update', 'partial_update']:
            if 'status' in self.request.data and len(self.request.data) == 1:
                return AppointmentStatusUpdateSerializer
            return AppointmentDetailSerializer
        return DoctorAppointmentSerializer
            

class DoctorScheduleView(ListAPIView):
    
    serializer_class = DoctorAppointmentSerializer 
    permission_classes = [IsDoctorUser]

    def get_queryset(self):
        user = self.request.user
        return Appointment.objects.filter(
            doctor=user, 
            status='Confirmed'
        ).order_by('appointment_date', 'appointment_time')
    
class AdminAppointmentViewSet(viewsets.ModelViewSet):

    queryset = Appointment.objects.all().order_by('-appointment_date', '-appointment_time')
    serializer_class = AdminAppointmentSerializer
    permission_classes = [IsAdminUser]

class DoctorDashboardDataView(APIView):
    permission_classes = [IsDoctorUser]

    def get(self, request):
        doctor = request.user
        today = timezone.now().date()

        todays_appointments = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=today,
            status__in=['Pending', 'Confirmed']
        ).order_by('appointment_time')

        pending_count = todays_appointments.filter(status='Pending').count()
        confirmed_count = todays_appointments.filter(status='Confirmed').count()
        total_upcoming_count = Appointment.objects.filter(
            doctor=doctor, 
            appointment_date__gte=today,
            status__in=['Pending', 'Confirmed']
        ).count()

        todays_appointments_data = DoctorAppointmentSerializer(todays_appointments, many=True).data

        data = {
            'pendingToday': pending_count,
            'confirmedToday': confirmed_count,
            'totalUpcoming': total_upcoming_count,
            'todaysAppointments': todays_appointments_data
        }
        return Response(data)