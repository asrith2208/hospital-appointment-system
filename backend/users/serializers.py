# backend/users/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import DoctorLicense
from django.core.mail import EmailMessage
from .models import PasswordResetOTP
from .models import DoctorSchedule
from .models import User
User = get_user_model()

class PatientRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'phone_number', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password2": "Passwords do not match."})
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "An account with this email already exists."})
        if 'phone_number' in attrs and attrs['phone_number'] and User.objects.filter(phone_number=attrs['phone_number']).exists():
            raise serializers.ValidationError({"phone_number": "An account with this phone number already exists."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        username = validated_data['email']
        user = User.objects.create_user(
            username=username,
            role='patient',
            **validated_data
        )
        return user


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField(max_length=255)
    password = serializers.CharField(
        label="Password",
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, data):
        identifier = data.get('identifier')
        password = data.get('password')

        if identifier and password:
            user = authenticate(request=self.context.get('request'), username=identifier, password=password)
            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "identifier" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        data['user'] = user
        return data
    
class DoctorRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    license_number = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'full_name', 'email', 'phone_number', 'password', 'password2',
            'specialization', 'qualification', 'years_of_experience', 'license_number'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    # Custom validation for the license number field
    def validate_license_number(self, value):
        try:
            license_obj = DoctorLicense.objects.get(license_number=value)
            if license_obj.is_used:
                raise serializers.ValidationError("This medical license has already been registered.")
        except DoctorLicense.DoesNotExist:
            raise serializers.ValidationError("Invalid medical license number.")
        return value

    def validate(self, attrs):
        # ... (You can copy the password and unique checks from the patient serializer)
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password2": "Passwords do not match."})
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError({"email": "An account with this email already exists."})
        return attrs

    def create(self, validated_data):
        license_number = validated_data.pop('license_number')
        
        # Mark the license as used
        license_obj = DoctorLicense.objects.get(license_number=license_number)
        license_obj.is_used = True
        license_obj.save()

        # Create the user with the role 'doctor'
        validated_data.pop('password2')
        username = validated_data['email']
        user = User.objects.create_user(
            username=username,
            role='doctor',
            **validated_data
        )
        return user
    
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user is associated with this email address.")
        return value

class PasswordResetVerifySerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"new_password": "Passwords do not match."})
        return attrs
    
class DoctorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'specialization']


class PatientDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'phone_number']



class AdminUserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model for admin viewing and editing.
    Shows more fields than a regular user would see.
    """
    class Meta:
        model = User
        # List all fields an admin should be able to see and edit
        fields = [
            'id', 'username', 'email', 'full_name', 'phone_number', 
            'role', 'is_active', 'is_staff', 'date_joined',
            'specialization', 'qualification', 'years_of_experience'
        ]
        # Make some fields read-only in the list view but editable in detail view
        read_only_fields = ['date_joined', 'username']

class AdminUserListSerializer(serializers.ModelSerializer):
    """Serializer for listing users in the admin panel."""
    class Meta:
        model = User
        fields = [
            'id', 'full_name', 'email', 'phone_number', 
            'role', 'is_active', 'date_joined'
        ]

class AdminUserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for an admin to update a user's profile."""
    class Meta:
        model = User
        # Define fields an admin is allowed to change
        fields = [
            'full_name', 'email', 'phone_number', 
            'role', 'is_active',
            'specialization', 'qualification', 'years_of_experience'
        ]
        extra_kwargs = {
            # Make email not strictly required on update
            'email': {'required': False}, 
        }

    def update(self, instance, validated_data):
        # Prevent changing a user's role to 'admin' via this endpoint for security
        if 'role' in validated_data and validated_data['role'] == 'admin' and instance.role != 'admin':
             raise serializers.ValidationError({"role": "Cannot promote user to Admin via this endpoint."})
        
        return super().update(instance, validated_data)
    
class DoctorScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorSchedule
        fields = ['id', 'doctor', 'day_of_week', 'start_time', 'end_time']

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            'id', 'email', 'full_name', 'phone_number', 'role', 'date_joined',
            
            # Existing Doctor Fields
            'specialization', 'qualification', 'years_of_experience',
            'profile_picture', 'doctor_id_number', 'license_number', 
            'professional_bio', 'office_address', 'languages', 
            'consultation_fee', 'education', 'certifications', 
            'research_and_publications', 'patient_rating', 'total_patients',

            # --- ADD NEW PATIENT FIELDS ---
            'date_of_birth', 'blood_group', 'address',
            'emergency_contact_name', 'emergency_contact_phone',
        ]
        read_only_fields = ['email', 'date_joined', 'role'  ]


class PatientListSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'phone_number']

class PatientInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'role']

class DoctorLicenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorLicense
        fields = ['id', 'license_number', 'is_used']