from django.contrib import admin
from .models import User, DoctorLicense, DoctorSchedule

@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'full_name', 'role', 'is_staff']
    list_filter = ['role', 'is_staff', 'is_active']
    search_fields = ['username', 'full_name', 'email']
admin.site.register(DoctorLicense)
admin.site.register(DoctorSchedule)