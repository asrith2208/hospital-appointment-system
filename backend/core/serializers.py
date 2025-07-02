from rest_framework import serializers
from .models import AuditLog, Notification
from .models import Conversation, Message
from users.serializers import PatientInfoSerializer


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'is_read', 'created_at', 'link']

from rest_framework import serializers
from .models import Conversation, Message
from users.serializers import PatientInfoSerializer 

class MessageSerializer(serializers.ModelSerializer):
    sender = PatientInfoSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'content', 'timestamp', 'is_read']


class ConversationSerializer(serializers.ModelSerializer):
    
    participants = PatientInfoSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['id', 'participants', 'last_message', 'created_at']

    def get_last_message(self, obj):
        
        last_msg = obj.messages.order_by('-timestamp').first()
        if last_msg:
            return MessageSerializer(last_msg).data
        return None

class AuditLogSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField() 

    class Meta:
        model = AuditLog
        fields = ['id', 'user', 'action', 'timestamp', 'details']