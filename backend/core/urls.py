
from django.urls import path
from .views import (NotificationListView, MarkNotificationAsReadView, NotificationListView, MarkNotificationAsReadView,
    ConversationListView, MessageListView, SendMessageView, FindOrCreateConversationView,  AuditLogListView
)

urlpatterns = [
    path('notifications/', NotificationListView.as_view(), name='notification-list'),
    path('notifications/<int:pk>/mark-as-read/', MarkNotificationAsReadView.as_view(), name='notification-mark-read'),
    path('conversations/', ConversationListView.as_view(), name='conversation-list'),
    path('conversations/<int:pk>/messages/', MessageListView.as_view(), name='message-list'),
    path('conversations/<int:pk>/send/', SendMessageView.as_view(), name='send-message'),
    path('conversations/find-or-create/', FindOrCreateConversationView.as_view(), name='find-or-create-conversation'),
    path('audit-logs/', AuditLogListView.as_view(), name='audit-log-list'),

]