#!/bin/bash

echo "🔧 Starting development server..."

# Environment variables
export NODE_ENV=development

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "✅ Starting Next.js development server..."
npm run dev

echo "🎉 Development server is running on http://localhost:3000"
