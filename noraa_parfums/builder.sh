#!/bin/bash
set -e

echo "--- Backend ---"
cd backend
npm install
npm run build || echo "Backend has no build step"

echo "--- Frontend ---"
cd ../frontend
npm install
npm run build

echo "Build finished successfully!"
