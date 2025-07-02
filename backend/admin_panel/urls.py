from django.urls import path
from .views import GlobalSearchView 

from .views import AdminStatsView, AppointmentTrendsView, ReportsView, SettingsView, AuditLogsView

urlpatterns = [
    path('stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('appointment-trends/', AppointmentTrendsView.as_view(), name='admin-appointment-trends'),
    
    path('reports/', ReportsView.as_view(), name='admin-reports'),
    path('settings/', SettingsView.as_view(), name='admin-settings'),
    path('audit-logs/', AuditLogsView.as_view(), name='admin-audit-logs'),
    path('global-search/', GlobalSearchView.as_view(), name='admin-global-search'),
]