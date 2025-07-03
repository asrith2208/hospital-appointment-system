#!/usr/bin/env bash
#
# This script is run by Render during the build process for your web service.
# The 'set -o errexit' command ensures that if any command fails,
# the entire build will stop. This is a best practice for deployment scripts.
#
set -o errexit

# 1. Install all Python dependencies listed in your requirements.txt file.
echo "--- Installing dependencies ---"
pip install -r requirements.txt

# 2. Collect all static files (from Django admin, etc.) into the STATIC_ROOT directory.
# The --no-input flag is important for non-interactive environments.
echo "--- Collecting static files ---"
python manage.py collectstatic --no-input

# 3. Apply any new database migrations to update the database schema.
echo "--- Applying database migrations ---"
python manage.py migrate

# 4. (TEMPORARY STEP) Run our custom command to create the initial admin user.
#    This command will use the ADMIN_EMAIL and ADMIN_PASSWORD environment
#    variables that we will set on the Render dashboard.
echo "--- Creating initial admin user (if it doesn't exist) ---"
python manage.py create_initial_admin