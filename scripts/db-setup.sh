#!/bin/bash

echo "🗄️  Setting up database with Prisma..."

# Check if Prisma schema exists
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Prisma schema not found!"
    exit 1
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client!"
    exit 1
fi

# Check database connection
echo "🔍 Checking database connection..."
npx prisma db pull --force || echo "⚠️  Could not pull from database (this is normal for new setups)"

# Push schema to database
echo "📤 Pushing schema to database..."
npx prisma db push

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo "🎯 You can now use Prisma Studio: npx prisma studio"
else
    echo "❌ Database setup failed!"
    exit 1
fi
