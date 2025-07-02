from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from users.views import DoctorScheduleViewSet
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
router = DefaultRouter()
router.register(r'schedules', DoctorScheduleViewSet, basename='doctor-schedule')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')), 
    path('api/core/', include('core.urls')),
    path('api/', include('appointments.urls')),
    path('api/users/', include('users.urls')),
    path('api/appointments/', include('appointments.urls')),
    path('api/auth/', include('auth_app.urls')),
    path('api/admin/', include('admin_panel.urls')),
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
    

