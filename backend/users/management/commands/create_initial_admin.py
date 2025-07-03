from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

# Get the custom User model defined in your project
User = get_user_model()

class Command(BaseCommand):
    """
    A Django management command to create an admin user non-interactively.
    It reads credentials from environment variables.
    This is essential for creating the first user in a deployment environment
    like Render where interactive shells are not on the free plan.
    """
    help = 'Creates the initial admin user from environment variables if it does not exist.'

    def handle(self, *args, **options):
        # Read the admin credentials from environment variables set on the Render dashboard.
        admin_email = os.environ.get('ADMIN_EMAIL')
        admin_password = os.environ.get('ADMIN_PASSWORD')

        # Check if the necessary environment variables are set.
        if not admin_email or not admin_password:
            self.stdout.write(self.style.ERROR(
                'CRITICAL: ADMIN_EMAIL and ADMIN_PASSWORD environment variables must be set.'
            ))
            # Exit the command if they are missing.
            return

        # Check if an admin user with this email already exists to prevent errors on re-deployment.
        if User.objects.filter(email=admin_email).exists():
            self.stdout.write(self.style.WARNING(
                f'Admin user with email {admin_email} already exists. Skipping creation.'
            ))
        else:
            # If the user does not exist, create them.
            self.stdout.write(f"Attempting to create admin user for: {admin_email}...")
            
            # Use the `create_superuser` method which automatically sets is_staff and is_superuser to True.
            User.objects.create_superuser(
                username=admin_email, # It's good practice to set the username to the email.
                email=admin_email,
                password=admin_password,
                role='admin',         # Set the custom role field.
                full_name='Hospital Administrator' # Set a default full name.
            )
            
            # Print a success message to the Render build logs.
            self.stdout.write(self.style.SUCCESS(
                f'Successfully created admin user: {admin_email}'
            ))