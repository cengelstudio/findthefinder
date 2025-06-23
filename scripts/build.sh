#!/bin/bash

echo "🏗️  Building Next.js application..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf out

# Type check
echo "🔍 Running type check..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "❌ Type check failed. Fix type errors before building."
    exit 1
fi

# Lint check
echo "🔍 Running lint check..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  Lint warnings found. Consider fixing them."
fi

# Build
echo "📦 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📊 Build size analysis:"
    du -sh .next
else
    echo "❌ Build failed!"
    exit 1
fi
