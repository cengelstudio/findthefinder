#!/bin/bash

echo "🚀 Starting production server on port 3000..."

# Environment variables
export NODE_ENV=production
export PORT=3000

# Check if build exists
if [ ! -d ".next" ]; then
    echo "⚠️  No build found. Building first..."
    npm run build
fi

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Cannot start production server."
    exit 1
fi

echo "✅ Starting Next.js production server..."
npm run start

echo "🎉 Production server is running on http://localhost:3000"
