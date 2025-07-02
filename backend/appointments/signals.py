
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

from .models import Appointment
from core.models import Notification


@receiver(pre_save, sender=Appointment)
def handle_appointment_status_changes(sender, instance, **kwargs):
    """
    A single, powerful signal handler that runs BEFORE an appointment is saved.
    It detects status changes (like cancellation or postponement) and sends HTML emails.
    """
  
    if not instance.pk:
        return

    try:
        old_instance = Appointment.objects.get(pk=instance.pk)
    except Appointment.DoesNotExist:
        return
        
    if old_instance.status != 'Cancelled' and instance.status == 'Cancelled':
        print(f"Appointment {instance.id} cancelled. Preparing emails...")

        context = {
            'patient_name': instance.patient.full_name,
            'doctor_name': instance.doctor.full_name,
            'appointment_date': instance.appointment_date.strftime('%B %d, %Y'),
            'appointment_time': instance.appointment_time.strftime('%I:%M %p'),
        }

        # Send email to the Patient
        context['recipient_name'] = instance.patient.full_name
        html_content_patient = render_to_string('emails/appointment_cancellation.html', context)
        text_content_patient = f"Your appointment with Dr. {instance.doctor.full_name} has been cancelled."
        msg_patient = EmailMultiAlternatives('Appointment Cancellation Notice', text_content_patient, settings.DEFAULT_FROM_EMAIL, [instance.patient.email])
        msg_patient.attach_alternative(html_content_patient, "text/html")
        msg_patient.send()

        # Send email to the Doctor
        context['recipient_name'] = f"Dr. {instance.doctor.full_name}"
        html_content_doctor = render_to_string('emails/appointment_cancellation.html', context)
        text_content_doctor = f"Your appointment with {instance.patient.full_name} has been cancelled."
        msg_doctor = EmailMultiAlternatives('Appointment Cancellation Notice', text_content_doctor, settings.DEFAULT_FROM_EMAIL, [instance.doctor.email])
        msg_doctor.attach_alternative(html_content_doctor, "text/html")
        msg_doctor.send()

    # --- 2. Postponement (Reschedule) Logic ---
    # Check if the date or time has been changed.
    is_rescheduled = (old_instance.appointment_date != instance.appointment_date or 
                      old_instance.appointment_time != instance.appointment_time)

    if is_rescheduled:
        print(f"Appointment {instance.id} rescheduled. Preparing emails...")
        # When postponed, always revert the status to 'Pending' for re-confirmation
        instance.status = 'Pending'

        context = {
            'patient_name': instance.patient.full_name,
            'doctor_name': instance.doctor.full_name,
            'appointment_date': instance.appointment_date.strftime('%B %d, %Y'),
            'appointment_time': instance.appointment_time.strftime('%I:%M %p'),
            'status': instance.status,
        }

        # Send email to Patient
        context['recipient_name'] = instance.patient.full_name
        html_content_patient = render_to_string('emails/appointment_rescheduled.html', context)
        text_content_patient = f"Your appointment with Dr. {instance.doctor.full_name} has been rescheduled to {context['appointment_date']} at {context['appointment_time']}."
        msg_patient = EmailMultiAlternatives('Appointment Rescheduled', text_content_patient, settings.DEFAULT_FROM_EMAIL, [instance.patient.email])
        msg_patient.attach_alternative(html_content_patient, "text/html")
        msg_patient.send()

        # Send email to Doctor
        context['recipient_name'] = f"Dr. {instance.doctor.full_name}"
        html_content_doctor = render_to_string('emails/appointment_rescheduled.html', context)
        text_content_doctor = f"Your appointment with {instance.patient.full_name} has been rescheduled."
        msg_doctor = EmailMultiAlternatives('Appointment Rescheduled', text_content_doctor, settings.DEFAULT_from_email, [instance.doctor.email])
        msg_doctor.attach_alternative(html_content_doctor, "text/html")
        msg_doctor.send()


@receiver(post_save, sender=Appointment)
def handle_new_appointment_creation(sender, instance, created, **kwargs):
    """
    A separate, clean signal handler that runs AFTER an appointment is created.
    It sends a confirmation email and an in-app notification.
    """
    # This `if created:` block ensures this logic only runs once when the appointment is first made.
    if created:
        print(f"New Appointment {instance.id} created. Sending confirmation and notification...")
        
        # --- 1. Send In-App Notification to the Doctor ---
        Notification.objects.create(
            recipient=instance.doctor,
            message=f"New appointment booked by {instance.patient.full_name}.",
            link='/doctor/appointments'
        )

        # --- 2. Send HTML Confirmation Email to Patient and Doctor ---
        context = {
            'subject': 'Your Appointment is Booked!',
            'main_content': 'Your appointment has been successfully booked and is pending confirmation from the doctor. You will receive another notification once it is confirmed.',
            'recipient_name': instance.patient.full_name,
            'patient_name': instance.patient.full_name,
            'doctor_name': instance.doctor.full_name,
            'appointment_date': instance.appointment_date.strftime('%B %d, %Y'),
            'appointment_time': instance.appointment_time.strftime('%I:%M %p'),
            'status': instance.status,
        }
        
        # Send to Patient
        html_content_patient = render_to_string('emails/appointment_confirmation.html', context)
        text_content_patient = "Your appointment has been booked."
        msg_patient = EmailMultiAlternatives(context['subject'], text_content_patient, settings.DEFAULT_FROM_EMAIL, [instance.patient.email])
        msg_patient.attach_alternative(html_content_patient, "text/html")
        msg_patient.send()

        # Send to Doctor
        context['subject'] = 'You have a new appointment booking!'
        context['main_content'] = f"{instance.patient.full_name} has booked a new appointment with you. Please review and confirm it in your dashboard."
        context['recipient_name'] = f"Dr. {instance.doctor.full_name}"
        html_content_doctor = render_to_string('emails/appointment_confirmation.html', context)
        text_content_doctor = "You have a new appointment booking."
        msg_doctor = EmailMultiAlternatives(context['subject'], text_content_doctor, settings.DEFAULT_FROM_EMAIL, [instance.doctor.email])
        msg_doctor.attach_alternative(html_content_doctor, "text/html")
        msg_doctor.send()