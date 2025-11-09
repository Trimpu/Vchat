#!/bin/bash

# Vchat - Quick Start Script
# This script helps you run Vchat locally for development

echo "🚀 Starting Vchat..."
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 found"
    echo "📡 Starting server on http://localhost:8000"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
# Check if Node.js is available
elif command -v npx &> /dev/null; then
    echo "✅ Node.js found"
    echo "📡 Starting server on http://localhost:8080"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    npx http-server -p 8080
else
    echo "❌ Neither Python 3 nor Node.js found"
    echo ""
    echo "Please install one of the following:"
    echo "  - Python 3: https://www.python.org/downloads/"
    echo "  - Node.js: https://nodejs.org/"
    echo ""
    echo "Or open index.html directly in your browser"
    exit 1
fi
