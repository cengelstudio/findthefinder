#!/bin/bash

echo "🚀 Deploying application..."

# Configuration
BUILD_DIR=".next"
BACKUP_DIR="backup/$(date +%Y%m%d_%H%M%S)"

# Create backup directory
echo "💾 Creating backup..."
mkdir -p "$BACKUP_DIR"

# Backup current build if exists
if [ -d "$BUILD_DIR" ]; then
    cp -r "$BUILD_DIR" "$BACKUP_DIR/"
    echo "✅ Backup created at $BACKUP_DIR"
fi

# Pull latest changes
echo "📥 Pulling latest changes from git..."
git fetch origin
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ Failed to pull latest changes!"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    echo "🔄 Restoring backup..."
    if [ -d "$BACKUP_DIR/$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
        mv "$BACKUP_DIR/$BUILD_DIR" .
    fi
    exit 1
fi

# Build application
echo "🏗️  Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    echo "🔄 Restoring backup..."
    if [ -d "$BACKUP_DIR/$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
        mv "$BACKUP_DIR/$BUILD_DIR" .
    fi
    exit 1
fi

# Restart application (you might need to customize this part)
echo "🔄 Restarting application..."
if command -v pm2 &> /dev/null; then
    pm2 restart nextapp || pm2 start npm --name "nextapp" -- start
elif command -v systemctl &> /dev/null; then
    sudo systemctl restart nextapp || echo "⚠️  Please restart your application manually"
else
    echo "⚠️  Please restart your application manually"
fi

echo "✅ Deployment completed successfully!"
echo "🎉 Application is now running with the latest changes!"
