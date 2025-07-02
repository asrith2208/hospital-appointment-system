
from django.db import models
from django.conf import settings

class Appointment(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
        ('Completed', 'Completed'),
    )

    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_appointments')
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_appointments')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    consultation_notes = models.TextField(blank=True, null=True, help_text="Notes from the doctor's consultation.")
    prescription = models.TextField(blank=True, null=True, help_text="Prescription details provided by the doctor.")
    EVENT_TYPE_CHOICES = (
        ('appointment', 'Appointment'),
        ('blocked', 'Blocked'),
    )
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES, default='appointment')

    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_appointments', null=True, blank=True)
    doctor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doctor_appointments')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    reason = models.TextField(blank=True) 
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('doctor', 'appointment_date', 'appointment_time')

    def __str__(self):
        if self.event_type == 'appointment':
            return f"Appointment with Dr. {self.doctor.full_name} for {self.patient.full_name}"
        else:
            return f"Blocked time for Dr. {self.doctor.full_name}"

