# backend/users/backends.py

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

UserModel = get_user_model()

class EmailBackend(ModelBackend):
    """
    This is a foolproof authentication backend.
    It first tries to authenticate with the provided identifier as an email.
    If that fails, it assumes the identifier is a username and tries again.
    This works for both regular users (using email) and superusers
    created via the command line (which might rely on username).
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        # The 'username' from the authenticate call is our identifier (email or username)
        identifier = username
        try:
            # 1. First, try to fetch the user by email (case-insensitive)
            user = UserModel.objects.get(email__iexact=identifier)
        except UserModel.DoesNotExist:
            # 2. If no user is found by email, try to fetch by username as a fallback
            try:
                user = UserModel.objects.get(username__iexact=identifier)
            except UserModel.DoesNotExist:
                # If user is not found by either email or username, authentication fails.
                return None

        # 3. If a user was found, check their password
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        
        # If password check fails, authentication fails.
        return None

    def get_user(self, user_id):
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None