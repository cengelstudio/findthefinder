#!/bin/bash

echo "📦 Installing dependencies..."

# Check Node.js version
echo "🔍 Checking Node.js version..."
node_version=$(node --version)
echo "Node.js version: $node_version"

# Check npm version
npm_version=$(npm --version)
echo "npm version: $npm_version"

# Clean install
echo "🧹 Cleaning previous installations..."
rm -rf node_modules
rm -f package-lock.json

echo "📥 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"

    # Setup husky if it exists
    if [ -f ".husky/pre-commit" ] || [ -d ".husky" ]; then
        echo "🪝 Setting up Husky..."
        npm run prepare
    fi

    echo "🎯 Ready to start development!"
    echo "Run: npm run dev or ./scripts/start-dev.sh"
else
    echo "❌ Failed to install dependencies!"
    exit 1
fi
