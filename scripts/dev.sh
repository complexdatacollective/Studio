#!/bin/sh

# Start Docker container
docker-compose -f docker-compose.dev.yml up -d

# Run the Next.js development server
next dev --turbopack

# Stop Docker container when Next.js development server exits
docker-compose -f docker-compose.dev.yml down
