
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from django.conf import settings
from appointments.models import Appointment

class Command(BaseCommand):
    help = 'Sends 24-hour reminders for confirmed appointments.'

    def handle(self, *args, **options):
        now = timezone.now()
        reminder_start_time = now + timedelta(hours=24)
        reminder_end_time = now + timedelta(hours=25)

        appointments_to_remind = Appointment.objects.filter(
            status='Confirmed',
            appointment_date=reminder_start_time.date(),
            appointment_time__gte=reminder_start_time.time(),
            appointment_time__lt=reminder_end_time.time()
        )

        if not appointments_to_remind:
            self.stdout.write(self.style.SUCCESS('No appointments to send reminders for.'))
            return

        for appt in appointments_to_remind:
            patient_email = appt.patient.email
            appointment_details = f"{appt.appointment_date} at {appt.appointment_time.strftime('%H:%M')}"
            
            send_mail(
                'Appointment Reminder',
                f"Dear {appt.patient.full_name},\n\nThis is a reminder for your upcoming appointment with Dr. {appt.doctor.full_name} tomorrow, {appointment_details}.\n\nWe look forward to seeing you.\n\nSincerely,\nTitiksha Hospitals",
                settings.DEFAULT_FROM_EMAIL,
                [patient_email],
                fail_silently=False,
            )
            self.stdout.write(self.style.SUCCESS(f'Successfully sent reminder for appointment {appt.id}'))