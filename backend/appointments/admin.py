from django.contrib import admin
from .models import Appointment
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'doctor', 'appointment_date', 'appointment_time', 'status')
    list_filter = ('status', 'appointment_date', 'doctor')
    search_fields = ('patient__full_name', 'doctor__full_name', 'reason')
admin.site.register(Appointment, AppointmentAdmin)
