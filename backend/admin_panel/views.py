

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.utils import timezone
from datetime import timedelta
from django.db.models import Count
from django.db.models import Q
from users.serializers import AdminUserSerializer
from users.models import User
from appointments.models import Appointment
from users.permissions import IsAdminUser

class AdminStatsView(APIView):
    """
    Provides key statistics for the admin dashboard.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        total_appointments = Appointment.objects.count()
        active_doctors = User.objects.filter(role='doctor', is_active=True).count()
        registered_patients = User.objects.filter(role='patient').count()

        stats = {
            'total_appointments': total_appointments,
            'active_doctors': active_doctors,
            'registered_patients': registered_patients,
        }
        return Response(stats)


class AppointmentTrendsView(APIView):
    """
    Provides data for appointment trends over the last 7 days.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        seven_days_ago = timezone.now().date() - timedelta(days=7)
        
        trends = (
            Appointment.objects.filter(appointment_date__gte=seven_days_ago)
            .values('appointment_date')
            .annotate(count=Count('id'))
            .order_by('appointment_date')
        )

        formatted_trends = {
            item['appointment_date'].strftime('%b %d'): item['count'] 
            for item in trends
        }

        return Response(formatted_trends)
    
class ReportsView(APIView):
    """
    Placeholder for generating various reports.
    In a real app, this would take parameters and generate CSVs or PDFs.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        report_data = {
            'message': "Report generation endpoint is active.",
            'available_reports': [
                'appointment_summary',
                'doctor_performance',
                'patient_demographics',
                'revenue_report'
            ]
        }
        return Response(report_data)

class SettingsView(APIView):
    """
    Placeholder for viewing and updating hospital-wide settings.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        settings_data = {
            'appointment_duration_minutes': 30,
            'hospital_open_time': "08:00:00",
            'hospital_close_time': "18:00:00",
            'cancellation_policy': "Cancellations must be made 24 hours in advance."
        }
        return Response(settings_data)

    def post(self, request, format=None):
        print("Received new settings:", request.data)
        return Response({'message': 'Settings updated successfully.'})

class AuditLogsView(APIView):
    """
    Placeholder for viewing audit logs.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        audit_logs = [
            {'timestamp': timezone.now() - timedelta(hours=1), 'user': 'admin@hospital.com', 'action': 'Updated schedule for Dr. Smith.'},
            {'timestamp': timezone.now() - timedelta(hours=2), 'user': 'patient@example.com', 'action': 'Booked appointment with Dr. Jones.'},
            {'timestamp': timezone.now() - timedelta(hours=5), 'user': 'doctor@hospital.com', 'action': 'Marked appointment #123 as a-Completed.'},
        ]
        return Response(audit_logs)
    
class GlobalSearchView(APIView):
    """
    A global search endpoint for admins.
    Searches for users by name, email, or role.
    """
    permission_classes = [IsAdminUser]

    def get(self, request, format=None):
        query = request.query_params.get('q', '')
        if len(query) < 2:
            return Response([])

        users = User.objects.filter(
            Q(full_name__icontains=query) |
            Q(email__icontains=query) |
            Q(role__icontains=query)
        ).order_by('full_name')[:10] 

        serializer = AdminUserSerializer(users, many=True)
        return Response(serializer.data)