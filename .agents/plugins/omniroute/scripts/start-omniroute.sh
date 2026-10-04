#!/usr/bin/env bash
# ==============================================================================
# OmniRoute Local Gateway Launcher
# Starts OmniRoute via Docker or npm on port 20128
# ==============================================================================

set -e

PORT=20128
HOST="127.0.0.1"

echo "=== Checking OmniRoute Gateway on http://${HOST}:${PORT} ==="

if curl -s "http://${HOST}:${PORT}/health" >/dev/null 2>&1; then
    echo "OmniRoute gateway is already running and healthy at http://${HOST}:${PORT}"
    exit 0
fi

if command -v docker >/dev/null 2>&1; then
    echo "Starting OmniRoute via Docker..."
    docker run -d --name omniroute --restart unless-stopped -p ${HOST}:${PORT}:${PORT} diegosouzapw/omniroute:latest || docker start omniroute
    echo "OmniRoute started in Docker container. Access UI at http://${HOST}:${PORT}"
elif command -v npx >/dev/null 2>&1; then
    echo "Starting OmniRoute via npx..."
    npx -y omniroute start --port ${PORT} --host ${HOST} &
    echo "OmniRoute process launched in background."
else
    echo "Neither Docker nor Node.js (npx) was found. Please install Docker or Node to run OmniRoute locally."
    exit 1
fi
