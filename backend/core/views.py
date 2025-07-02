from django.shortcuts import render
from rest_framework import viewsets
from core.models import AuditLog 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Conversation, Message, Notification
from .serializers import ConversationSerializer, MessageSerializer, NotificationSerializer
from users.models import User
from .serializers import AuditLogSerializer 
from users.permissions import IsAdminUser

class UserViewSet(viewsets.ModelViewSet):

    def perform_destroy(self, instance):
        """
        Log the deletion action before destroying the object.
        """
        AuditLog.objects.create(
            user=self.request.user,
            action=f"Deleted User: {instance.email} (ID: {instance.id})",
            details=f"The admin {self.request.user.email} deleted the user."
        )
        instance.delete()

class NotificationListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        notifications = Notification.objects.filter(recipient=request.user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)

class MarkNotificationAsReadView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk, recipient=request.user)
            notification.is_read = True
            notification.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)
        
class ConversationListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        conversations = request.user.conversations.all()
        serializer = ConversationSerializer(conversations, many=True)
        return Response(serializer.data)

class MessageListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            conversation = request.user.conversations.get(pk=pk)
            messages = conversation.messages.all()
            serializer = MessageSerializer(messages, many=True)
            return Response(serializer.data)
        except Conversation.DoesNotExist:
            return Response({"error": "Conversation not found or you are not a participant."}, status=status.HTTP_404_NOT_FOUND)

class SendMessageView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            conversation = request.user.conversations.get(pk=pk)
            content = request.data.get('content')
            
            if not content:
                return Response({"error": "Message content cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)

            message = Message.objects.create(
                conversation=conversation,
                sender=request.user,
                content=content
            )
            serializer = MessageSerializer(message)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Conversation.DoesNotExist:
            return Response({"error": "Conversation not found or you are not a participant."}, status=status.HTTP_404_NOT_FOUND)
        
class FindOrCreateConversationView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        recipient_id = request.data.get('recipient_id')
        if not recipient_id:
            return Response({"error": "recipient_id is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            recipient = User.objects.get(id=recipient_id)
        except User.DoesNotExist:
            return Response({"error": "Recipient user not found."}, status=status.HTTP_404_NOT_FOUND)

        sender = request.user
        
        conversation = Conversation.objects.filter(
            participants=sender
        ).filter(
            participants=recipient
        ).first()

        if not conversation:
            conversation = Conversation.objects.create()
            conversation.participants.add(sender, recipient)

        serializer = ConversationSerializer(conversation)
        return Response(serializer.data, status=status.HTTP_200_OK)

class SendMessageView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            conversation = request.user.conversations.get(pk=pk)
            content = request.data.get('content')
            
            if not content:
                return Response(...) 
            message = Message.objects.create(
                conversation=conversation,
                sender=request.user,
                content=content
            )
            

            other_participants = conversation.participants.exclude(id=request.user.id)
            for participant in other_participants:
                Notification.objects.create(
                    recipient=participant,
                    message=f"New message from {request.user.full_name}",
                    link=f"/patient/messages" 
                )

            serializer = MessageSerializer(message)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Conversation.DoesNotExist:
            return Response(...)
        

class AuditLogListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        logs = AuditLog.objects.all().order_by('-timestamp')[:100] # Get last 100 logs
        serializer = AuditLogSerializer(logs, many=True)
        return Response(serializer.data)