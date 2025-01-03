#!/bin/bash
set -e  # Exit on error

echo "=== Palace of Goods Frontend: Entrypoint Script ==="

# Check required environment variables
REQUIRED_ENV_VARS=("REACT_APP_API_URL" "REACT_APP_TITLE")
for VAR in "${REQUIRED_ENV_VARS[@]}"; do
  if [ -z "${!VAR}" ]; then
    echo "ERROR: Missing required environment variable: $VAR"
    exit 1
  fi
done
echo "All required environment variables are set."

# Inject runtime environment variables into the build
echo "Injecting runtime environment variables into build..."
cat <<EOF > /usr/share/nginx/html/env-config.js
window.env = {
$(for VAR in "${REQUIRED_ENV_VARS[@]}"; do
  echo "  $VAR: \"${!VAR}\","
done)
};
EOF
echo "Runtime environment variables injected."

# Start Nginx
echo "Starting Nginx..."
exec nginx -g "daemon off;"