from rest_framework import serializers
from users.models import User
from core.models import DoctorLicense
from django.contrib.auth import authenticate

class PatientRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'full_name', 'phone_number')
        extra_kwargs = {'password': {'write_only': True}, 'full_name': {'source': 'first_name', 'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            phone_number=validated_data.get('phone_number'),
            role='patient'
        )
        return user

class DoctorRegisterSerializer(serializers.ModelSerializer):
    license_number = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'full_name', 'phone_number', 'license_number')
        extra_kwargs = {'password': {'write_only': True}, 'full_name': {'source': 'first_name', 'write_only': True}}
    
    def validate_license_number(self, value):
        try:
            license_obj = DoctorLicense.objects.get(license_number=value, is_used=False)
            return license_obj
        except DoctorLicense.DoesNotExist:
            raise serializers.ValidationError("Invalid or already used license number.")

    def create(self, validated_data):
        license_obj = validated_data.pop('license_number')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            phone_number=validated_data.get('phone_number'),
            role='doctor'
        )
        license_obj.is_used = True
        license_obj.save()
        return user

class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField() # Can be email or phone
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data.get('identifier')
        password = data.get('password')

        user = None
        if '@' in identifier:
            # It's an email
            user = authenticate(username=identifier, password=password)
        else:
            # It's a phone number
            try:
                user_by_phone = User.objects.get(phone_number=identifier)
                user = authenticate(username=user_by_phone.email, password=password)
            except User.DoesNotExist:
                pass
        
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials. Please try again.")

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
    password = serializers.CharField(write_only=True)