# backend/hospital_project/settings.py

import os
from pathlib import Path
import environ
import dj_database_url

# 1. Initialize django-environ
env = environ.Env(
    # Set default values and casting for environment variables
    # DEBUG will be False if the environment variable is not set
    DEBUG=(bool, False)
)

# 2. Define the base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent

# 3. Read the .env file if it exists (for local development)
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# 4. Fetch the SECRET_KEY. The app will crash if this is not defined.
SECRET_KEY = env('SECRET_KEY')

# 5. Fetch DEBUG status.
DEBUG = env('DEBUG')

# --- ALLOWED_HOSTS Configuration (The Main Fix) ---
# Read the ALLOWED_HOSTS from the environment variable as a list of strings
# The default is an empty list [] if the variable isn't set.
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=[])

# This is a robust failsafe for deploying on Render.
# It gets the public URL of your service from an environment variable
# that Render automatically provides.
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME:
    # If the variable exists, add its value to our list of allowed hosts.
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Debugging: Print the final list to the logs so we can see what Django is using.
print(f"--- [INFO] Allowed Hosts: {ALLOWED_HOSTS}")

# --- Application definition ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic', # For serving static files in development
    'django.contrib.staticfiles',
    
    # 3rd Party Apps
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt', # Ensure Simple JWT is here

    # Local Apps
    'users',
    'appointments',
    'core',
    'admin_panel', # You mentioned this app
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # WhiteNoise must be high up
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', # CORS middleware
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'hospital_project.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
WSGI_APPLICATION = 'hospital_project.wsgi.application'

# --- Database ---
# This will use the DATABASE_URL from your Render environment variables in production,
# and from your local .env file during development.
DATABASES = {
    'default': dj_database_url.config(
        default=env('DATABASE_URL')
    )
}

# --- Authentication ---
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]
AUTHENTICATION_BACKENDS = [
    'users.backends.EmailOrPhoneBackend',
    'django.contrib.auth.backends.ModelBackend',
]
AUTH_USER_MODEL = 'users.User'

# --- Internationalization ---
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --- Static files (CSS, JavaScript, Images) ---
STATIC_URL = '/static/'
# This is where Django will collect all static files for production.
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# This makes sure WhiteNoise can find and serve the files efficiently.
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# --- CORS (Cross-Origin Resource Sharing) ---
# Read the allowed frontend URLs from the environment variable as a list.
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=[])
print(f"--- [INFO] CORS Allowed Origins: {CORS_ALLOWED_ORIGINS}") # Debugging

# --- Email ---
SENDGRID_API_KEY = env('SENDGRID_API_KEY', default=None)

if SENDGRID_API_KEY:
    # Use SendGrid if the API key is provided (in production)
    EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"
    # These settings are for sendgrid_backend
    SENDGRID_SANDBOX_MODE_IN_DEBUG = False # Set to True if you want to test without sending real emails
else:
    # Fallback to SMTP for local development
    print("--- [WARNING] SENDGRID_API_KEY not found. Falling back to SMTP for local email. ---")
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_HOST_USER = env('EMAIL_HOST_USER')
    EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD')

# This is used as the 'From' name in emails
DEFAULT_FROM_EMAIL = f"Titiksha Hospitals <{env('EMAIL_HOST_USER')}>"

# --- Django REST Framework ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTAuthentication',),
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticated',)
}