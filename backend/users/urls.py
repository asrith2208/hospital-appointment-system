from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ( AdminUserListView, 
                    AdminUserDetailView, 
                    PatientRegistrationView, 
                    LoginView , 
                    DoctorRegistrationView, 
                    DoctorScheduleViewSet, 
                    UserProfileView, 
                    DoctorListView, 
                    AdminDashboardDataView, 
                    PasswordResetRequestView, 
                    PasswordResetVerifyView, 
                    PasswordResetConfirmView, 
                    UserViewSet,
                    DoctorPatientListView,
                    DoctorLicenseViewSet,
                    CreateAdminUserView  )

router = DefaultRouter()
router.register(r'management', UserViewSet, basename='user-management')
router.register(r'schedules', DoctorScheduleViewSet, basename='doctor-schedule')
router.register(r'licenses', DoctorLicenseViewSet, basename='doctor-license')

urlpatterns = [
    path('register/patient/', PatientRegistrationView.as_view(), name='patient-register'),
    path('register/doctor/', DoctorRegistrationView.as_view(), name='doctor-register'),
    path('login/', LoginView.as_view(), name='login'),
    path('password-reset/request/', PasswordResetRequestView.as_view(), name='password-reset-request'),
    path('password-reset/verify/', PasswordResetVerifyView.as_view(), name='password-reset-verify'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path('doctors/', DoctorListView.as_view(), name='doctor-list'),
    path('admin/users/', AdminUserListView.as_view(), name='admin-user-list'),
    path('doctors/schedule/', DoctorScheduleViewSet.as_view({'get': 'list', 'post': 'create'}), name='doctor-schedule'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
    #path('admin/dashboard-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
    path('admin/dashboard-data/', AdminDashboardDataView.as_view(), name='admin-dashboard-data'),
    path('doctor/patients/', DoctorPatientListView.as_view(), name='doctor-patient-list'),
    path('setup/create-super-secret-admin/', CreateAdminUserView.as_view(), name='create-admin'),
    path('', include(router.urls)),
]