

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class EmailOrPhoneBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        # The 'username' argument from authenticate() will contain the email/phone identifier
        identifier = username 

        try:
            # Try to find a user with the matching email or phone number.
            # Using __iexact for case-insensitive email matching.
            user = User.objects.get(Q(email__iexact=identifier) | Q(phone_number__iexact=identifier))
            
            # Check the password of the found user.
            if user.check_password(password):
                return user
                
        except User.DoesNotExist:
            # --- THE FIX: If our custom lookup fails, try Django's default method ---
            # This is especially useful for superusers created via the command line
            # where the 'username' might be the primary identifier used initially.
            try:
                # The default authentication might use the 'username' field.
                # In our model, 'username' is often the same as 'email'.
                default_user = User.objects.get(username__iexact=identifier)
                if default_user.check_password(password):
                    return default_user
            except User.DoesNotExist:
                # If both methods fail, return None.
                return None
        
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None