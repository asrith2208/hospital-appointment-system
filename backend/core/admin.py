
from django.contrib import admin
from .models import AuditLog, Notification, Conversation, Message 
admin.site.register(AuditLog)
admin.site.register(Notification)
admin.site.register(Conversation)
admin.site.register(Message)