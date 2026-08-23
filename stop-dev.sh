#!/usr/bin/env bash
# Stop the detached dev server started by ./start-dev.sh
set -euo pipefail
PORT="${PORT:-3001}"
PID="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null | head -1 || true)"
if [ -z "$PID" ]; then echo "Nothing listening on :$PORT"; exit 0; fi
kill "$PID" 2>/dev/null || true
echo "Stopped :$PORT (pid $PID)"
