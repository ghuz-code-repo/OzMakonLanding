# Multi-stage build for React application
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Set base path for Vite build
ENV VITE_BASE_PATH=/landing/

# Build the application with base path
RUN npm run build -- --base=/landing/

# Production stage with nginx for SPA support
FROM nginx:alpine

# Copy built application from build stage
COPY --from=build /app/dist /usr/share/nginx/html/landing

# Copy assets directory to handle direct asset requests
COPY --from=build /app/src/assets /usr/share/nginx/html/landing/src/assets

# Create nginx config for React SPA with base path
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 80;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    index index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Handle landing path' >> /etc/nginx/conf.d/default.conf && \
    echo '    location /landing/ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        alias /usr/share/nginx/html/landing/;' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /landing/index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Handle direct asset requests for landing' >> /etc/nginx/conf.d/default.conf && \
    echo '    location /landing/src/assets/ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        alias /usr/share/nginx/html/landing/src/assets/;' >> /etc/nginx/conf.d/default.conf && \
    echo '        expires 1y;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public";' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Handle root redirect' >> /etc/nginx/conf.d/default.conf && \
    echo '    location = / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        return 301 /landing/;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '    # Cache static assets' >> /etc/nginx/conf.d/default.conf && \
    echo '    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {' >> /etc/nginx/conf.d/default.conf && \
    echo '        expires 1y;' >> /etc/nginx/conf.d/default.conf && \
    echo '        add_header Cache-Control "public";' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
