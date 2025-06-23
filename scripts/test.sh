#!/bin/bash

echo "🧪 Running tests..."

# Check if running in CI environment
if [ "$CI" = "true" ]; then
    echo "🤖 Running in CI mode..."
    npm run test -- --ci --coverage --watchAll=false
else
    echo "💻 Running in development mode..."

    # Parse arguments
    WATCH=false
    COVERAGE=false

    while [[ $* ]]; do
        case $1 in
            --watch|-w)
                WATCH=true
                ;;
            --coverage|-c)
                COVERAGE=true
                ;;
            --help|-h)
                echo "Usage: ./test.sh [options]"
                echo "Options:"
                echo "  --watch, -w      Run tests in watch mode"
                echo "  --coverage, -c   Generate coverage report"
                echo "  --help, -h       Show this help message"
                exit 0
                ;;
        esac
        shift
    done

    if [ "$WATCH" = true ]; then
        echo "👀 Running tests in watch mode..."
        npm run test:watch
    elif [ "$COVERAGE" = true ]; then
        echo "📊 Running tests with coverage..."
        npm run test:coverage
    else
        echo "🏃 Running tests once..."
        npm run test
    fi
fi

echo "✅ Tests completed!"
