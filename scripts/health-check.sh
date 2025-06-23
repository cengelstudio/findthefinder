#!/bin/bash

echo "🩺 Health checking application..."

# Configuration
HOST="localhost"
PORT="3000"
TIMEOUT=10

# Check if application is running
echo "🔍 Checking if application is running on $HOST:$PORT..."

# Use curl to check health
response=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout $TIMEOUT "http://$HOST:$PORT" 2>/dev/null)

if [ $? -eq 0 ] && [ "$response" -eq 200 ]; then
    echo "✅ Application is healthy and responding!"
    echo "📊 Response code: $response"

    # Additional checks
    echo "🔍 Performing additional checks..."

    # Check if API endpoints are responding
    api_response=$(curl -s -o /dev/null -w "%{http_code}" --connect-timeout $TIMEOUT "http://$HOST:$PORT/api/sitemap.xml.ts" 2>/dev/null)

    if [ "$api_response" -eq 200 ] || [ "$api_response" -eq 404 ]; then
        echo "✅ API endpoints are accessible"
    else
        echo "⚠️  API endpoints might have issues (response: $api_response)"
    fi

    # Check process
    if pgrep -f "next" > /dev/null; then
        echo "✅ Next.js process is running"
    else
        echo "⚠️  Next.js process not found"
    fi

    echo "🎉 Overall health: GOOD"
    exit 0
else
    echo "❌ Application is not responding!"
    echo "📊 Response code: ${response:-'no response'}"

    # Try to diagnose the issue
    echo "🔍 Diagnosing issues..."

    # Check if port is in use
    if netstat -tulpn 2>/dev/null | grep ":$PORT " > /dev/null; then
        echo "⚠️  Port $PORT is in use by another process"
        netstat -tulpn 2>/dev/null | grep ":$PORT "
    else
        echo "❌ Nothing is listening on port $PORT"
    fi

    # Check if Next.js process is running
    if pgrep -f "next" > /dev/null; then
        echo "⚠️  Next.js process is running but not responding"
    else
        echo "❌ Next.js process is not running"
    fi

    echo "💡 Try running: ./scripts/start-prod.sh or ./scripts/start-dev.sh"
    exit 1
fi
