#!/bin/bash

# Exit on error
set -e

echo "Starting production build process..."

# Clean up old builds
echo "Cleaning up previous builds..."
rm -rf .next out

# Install dependencies
echo "Installing dependencies..."
npm ci

# Run linting
echo "Running linter..."
npm run lint

# Build the application
echo "Building the application..."
npm run build

# Run any additional post-build steps here
echo "Build complete! The application is ready for production."
echo "To start the production server, run: npm run start"
echo "To deploy with Docker, run: docker-compose up -d" 