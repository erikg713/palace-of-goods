# Step 1: Build React App
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy app source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Copy build output from previous stage
COPY --from=build /app/build .

# Copy custom Nginx config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Use entrypoint script
ENTRYPOINT ["/entrypoint.sh"]