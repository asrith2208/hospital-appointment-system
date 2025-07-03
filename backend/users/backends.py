
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class EmailOrPhoneBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        identifier = username 

        try:
            
            user = User.objects.get(Q(email__iexact=identifier) | Q(phone_number__iexact=identifier))
            
            if user.check_password(password):
                return user
                
        except User.DoesNotExist:
            try:
                default_user = User.objects.get(username__iexact=identifier)
                if default_user.check_password(password):
                    return default_user
            except User.DoesNotExist:
                return None
        
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None