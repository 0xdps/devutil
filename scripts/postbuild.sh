#!/bin/bash

# Start preview server in background
echo "🚀 Starting preview server..."
npm run preview > /dev/null 2>&1 &
PREVIEW_PID=$!

# Wait for server to be ready
echo "⏳ Waiting for server to start..."
sleep 5

# Run pre-rendering
echo "📄 Running pre-render script..."
node scripts/prerender.mjs

# Kill preview server
echo "🛑 Stopping preview server..."
kill $PREVIEW_PID 2>/dev/null || true

# Also kill any process on port 4173
lsof -ti:4173 | xargs kill -9 2>/dev/null || true

echo "✅ Post-build complete!"
