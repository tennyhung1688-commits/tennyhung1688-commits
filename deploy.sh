#!/bin/bash
set -e

# AIHub Directory - One-click Deployment Script
# Usage: ./deploy.sh your-domain.com

DOMAIN=${1:-aihub.directory}
EMAIL=${2:-admin@aihub.directory}

echo "========================================="
echo "  AIHub Directory Deployment"
echo "  Domain: $DOMAIN"
echo "========================================="

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    exit 1
fi

DOCKER_COMPOSE="docker compose"
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
fi

# Update nginx config with domain
echo "📝 Updating nginx config with domain: $DOMAIN"
sed -i.bak "s/aihub.directory/$DOMAIN/g" nginx/conf.d/site.conf
rm -f nginx/conf.d/site.conf.bak

# Create certbot directories
mkdir -p certbot/conf certbot/www

# Build and start
echo "🔨 Building Docker images..."
$DOCKER_COMPOSE build

echo "🚀 Starting services (HTTP only first)..."
$DOCKER_COMPOSE up -d web nginx

# Wait for services
echo "⏳ Waiting for services to be ready..."
sleep 10

# Get SSL certificate
echo "🔐 Obtaining SSL certificate..."
docker run --rm \
    -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
    -v "$(pwd)/certbot/www:/var/www/certbot" \
    certbot/certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" -d "www.$DOMAIN"

# Reload nginx with SSL
echo "🔄 Reloading nginx with SSL..."
$DOCKER_COMPOSE restart nginx

echo ""
echo "========================================="
echo "  ✅ Deployment Complete!"
echo "  🌐 https://$DOMAIN"
echo "========================================="
echo ""
echo "  SSL auto-renewal:"
echo "  Add this to crontab for auto-renewal:"
echo "  0 3 * * * docker run --rm -v $(pwd)/certbot/conf:/etc/letsencrypt -v $(pwd)/certbot/www:/var/www/certbot certbot/certbot renew --quiet && docker compose restart nginx"
