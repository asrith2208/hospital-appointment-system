# backend/users/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
import uuid

class User(AbstractUser):
    ROLE_CHOICES = (('patient', 'Patient'), ('doctor', 'Doctor'), ('admin', 'Admin'))
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='patient')
    full_name = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True, unique=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)

    specialization = models.CharField(max_length=100, blank=True)
    qualification = models.CharField(max_length=200, blank=True)
    years_of_experience = models.PositiveIntegerField(null=True, blank=True)
    doctor_id_number = models.CharField(max_length=20, blank=True, null=True, unique=True)
    license_number = models.CharField(max_length=50, blank=True)
    professional_bio = models.TextField(blank=True, null=True)
    office_address = models.CharField(max_length=255, blank=True, null=True)
    languages = models.CharField(max_length=200, blank=True, help_text="Comma-separated list of languages")
    consultation_fee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    education = models.TextField(blank=True, null=True)
    certifications = models.TextField(blank=True, null=True)
    research_and_publications = models.TextField(blank=True, null=True)
    patient_rating = models.FloatField(default=0.0)
    total_patients = models.PositiveIntegerField(default=0)

    date_of_birth = models.DateField(null=True, blank=True)
    blood_group = models.CharField(max_length=5, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    emergency_contact_name = models.CharField(max_length=255, blank=True, null=True)
    emergency_contact_phone = models.CharField(max_length=20, blank=True, null=True)
    def __str__(self):
        return self.email
    
class DoctorLicense(models.Model):
    license_number = models.CharField(max_length=100, unique=True)
    is_used = models.BooleanField(default=False)

    def __str__(self):
        return self.license_number
    
class PasswordResetOTP(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"OTP for {self.user.email}"



class DoctorSchedule(models.Model):
    DAY_CHOICES = (
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    )

    doctor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='schedules', limit_choices_to={'role': 'doctor'})
    day_of_week = models.IntegerField(choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        # A doctor can only have one schedule entry per day
        unique_together = ('doctor', 'day_of_week')

    def __str__(self):
        return f"Schedule for Dr. {self.doctor.full_name} on {self.get_day_of_week_display()}"