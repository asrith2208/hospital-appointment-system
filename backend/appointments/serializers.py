from rest_framework import serializers
from .models import Appointment
from users.serializers import DoctorListSerializer
from users.serializers import PatientDetailSerializer
from users.models import User



class AppointmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor', 'appointment_date', 'appointment_time', 'reason']

    def create(self, validated_data):
        patient = self.context['request'].user
        appointment = Appointment.objects.create(patient=patient, **validated_data)
        return appointment
    
class AppointmentListSerializer(serializers.ModelSerializer):
    doctor = DoctorListSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = [
            'id', 
            'doctor', 
            'appointment_date', 
            'appointment_time', 
            'reason', 
            'status'
        ]

class DoctorAppointmentListSerializer(serializers.ModelSerializer):
    patient = PatientDetailSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'appointment_date', 'appointment_time', 'reason', 'status']


class AppointmentStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['status'] 
    def validate_status(self, value):

        if value not in [choice[0] for choice in Appointment.STATUS_CHOICES]:
            raise serializers.ValidationError("Invalid status choice.")
        return value
    
class PatientInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email']

class DoctorAppointmentSerializer(serializers.ModelSerializer):

    patient = PatientInfoSerializer(read_only=True)
    class Meta:
        model = Appointment
        fields = ['id', 'patient', 'appointment_date', 'appointment_time', 'reason', 'status', 'consultation_notes', 'prescription', 'event_type']
class AppointmentStatusUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['status']

class DoctorInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['full_name', 'specialization']

class PatientHistoryAppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorInfoSerializer(read_only=True)
    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'appointment_date', 'appointment_time', 'reason', 'status', 'consultation_notes', 'prescription']

class AppointmentDetailSerializer(serializers.ModelSerializer):
    """
    Serializer specifically for adding/updating notes and prescriptions.
    """
    class Meta:
        model = Appointment
        fields = ['consultation_notes', 'prescription'] 
    
class AdminAppointmentSerializer(serializers.ModelSerializer):
    patient = PatientInfoSerializer(read_only=True)
    doctor = DoctorInfoSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'