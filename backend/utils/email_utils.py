
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

def send_appointment_confirmation_email(appointment):
    """
    Sends a confirmation email to both the patient and the doctor.
    """
    patient = appointment.patient
    doctor = appointment.doctor
    
    context = {
        'patient_name': patient.full_name,
        'doctor_name': doctor.full_name,
        'appointment_date': appointment.appointment_date.strftime('%A, %B %d, %Y'),
        'appointment_time': appointment.appointment_time.strftime('%I:%M %p'),
        'hospital_name': 'Titiksha Hospitals',
    }

    html_content = render_to_string('emails/appointment_confirmation.html', context)
    # Create a plain text version of the HTML content
    text_content = strip_tags(html_content)

    # --- Email to Patient ---
    patient_email = EmailMultiAlternatives(
        subject=f"Appointment Confirmed with Dr. {doctor.full_name}",
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[patient.email]
    )
    patient_email.attach_alternative(html_content, "text/html")
    patient_email.send()

    # --- Email to Doctor ---
    doctor_email = EmailMultiAlternatives(
        subject=f"New Appointment with {patient.full_name}",
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[doctor.email]
    )
    doctor_email.attach_alternative(html_content, "text/html")
    doctor_email.send()