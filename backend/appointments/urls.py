from django.urls import path
from rest_framework.routers import DefaultRouter
from django.urls import include
from .views import (DoctorAppointmentsListView,
                    AppointmentStatusUpdateView,
                    DoctorScheduleView,
                    DoctorAvailabilityView, 
                    AppointmentCreateView, 
                    UpcomingAppointmentsView, 
                    AppointmentHistoryView, 
                    AppointmentViewSet,
                    PatientDashboardView, 
                    PatientAppointmentHistoryView,
                    DoctorDashboardView,
                    DepartmentListView,
                    AdminAppointmentViewSet,
                    DoctorDashboardDataView )



router = DefaultRouter()
router.register(r'manage', AppointmentViewSet, basename='doctor-appointment')
router.register(r'admin-manage', AdminAppointmentViewSet, basename='admin-appointment')


urlpatterns = [
    path('departments/', DepartmentListView.as_view(), name='department-list'),
    path('availability/', DoctorAvailabilityView.as_view(), name='doctor-availability'),
    path('doctor/dashboard/', DoctorDashboardDataView.as_view(), name='doctor-dashboard'),
    path('book/', AppointmentCreateView.as_view(), name='book-appointment'),
    
    path('upcoming/', UpcomingAppointmentsView.as_view(), name='upcoming-appointments'),
    
    path('history/', AppointmentHistoryView.as_view(), name='appointment-history'),

    path('doctor/list/', DoctorAppointmentsListView.as_view(), name='doctor-appointment-list'),
    path('<int:pk>/update-status/', AppointmentStatusUpdateView.as_view(), name='appointment-update-status'),

    path('availability/', DoctorAvailabilityView.as_view(), name='doctor-availability'),
    path('book/', AppointmentCreateView.as_view(), name='book-appointment'),
    path('history/patient/', PatientAppointmentHistoryView.as_view(), name='patient-appointment-history'),
    path('patient/dashboard/', PatientDashboardView.as_view(), name='patient-dashboard'),
    
    path('doctor/dashboard/', DoctorDashboardView.as_view(), name='doctor-dashboard'),
    path('doctor/schedule/', DoctorScheduleView.as_view(), name='doctor-schedule'),
    path('', include(router.urls)),


    
]