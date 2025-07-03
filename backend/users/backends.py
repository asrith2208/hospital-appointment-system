# backend/users/backends.py

from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class EmailOrPhoneBackend:
    """
    Authenticate a user by an exact match on email or phone number.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        # 'username' from authenticate() is the identifier we receive.
        identifier = username
        
        try:
            # Find a user that matches either the email (case-insensitive) or the phone number.
            user = User.objects.get(
                Q(email__iexact=identifier) | Q(phone_number__exact=identifier)
            )
        except User.DoesNotExist:
            # No user found with that identifier.
            return None
        except User.MultipleObjectsReturned:
            # This should not happen if your email/phone fields are unique.
            # If it does, return the first one found.
            user = User.objects.filter(
                Q(email__iexact=identifier) | Q(phone_number__exact=identifier)
            ).order_by('id').first()

        # Check if the found user's password is correct.
        if user and user.check_password(password):
            return user
            
        # If password check fails, authentication fails.
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None