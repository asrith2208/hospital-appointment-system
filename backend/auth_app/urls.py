from django.urls import path
from .views import (
    PatientRegisterView, DoctorRegisterView, LoginView,
    PasswordResetRequestView, PasswordResetConfirmView
)

urlpatterns = [
    path('register/patient/', PatientRegisterView.as_view(), name='patient-register'),
    path('register/doctor/', DoctorRegisterView.as_view(), name='doctor-register'),
    path('login/', LoginView.as_view(), name='login'),
    path('password-reset/request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]