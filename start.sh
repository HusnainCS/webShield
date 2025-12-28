#!/bin/bash
echo "🚀 Starting WebShield..."
cd backend && npm start &
sleep 3
cd frontend && npm run dev &
echo "✅ Both servers started!"
echo "👉 Backend: http://localhost:4000"
echo "👉 Frontend: http://localhost:5173"