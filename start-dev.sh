#!/usr/bin/env bash
# Start the dev server so it OUTLIVES the shell that started it.
#
# Why this exists: a plain `npx next dev` launched from an agent session gets
# killed when that session reaps its background tasks — it exited with signal
# 144 repeatedly on 2026-08-23 while Lucas was reviewing on his phone, which
# looked like the site crashing. Nothing was wrong with the site.
#
# `setsid` (via Python, which macOS has and coreutils' setsid is not) puts the
# server in its own session and process group, so a signal aimed at the parent
# shell's group cannot reach it.
#
# Usage:  ./start-dev.sh          then open http://localhost:3001
#         ./stop-dev.sh           to stop it
set -euo pipefail
cd "$(dirname "$0")"
PORT="${PORT:-3001}"
LOG="${LOG:-/tmp/nestglow-dev.log}"

if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Already running on :$PORT"
  exit 0
fi

python3 - "$LOG" "$PORT" <<'PY'
import subprocess, sys, os
log = open(sys.argv[1], "ab")
p = subprocess.Popen(
    ["npx", "next", "dev", "-p", sys.argv[2], "-H", "0.0.0.0"],
    cwd=os.getcwd(),
    stdin=subprocess.DEVNULL, stdout=log, stderr=log,
    start_new_session=True,
)
print("started, pid", p.pid)
PY

for _ in $(seq 1 60); do
  if curl -sf -o /dev/null "http://localhost:$PORT/"; then
    echo "Ready:  http://localhost:$PORT"
    echo "Phone:  http://$(ipconfig getifaddr en0 2>/dev/null || echo '<lan-ip>'):$PORT"
    echo "Log:    $LOG"
    exit 0
  fi
  sleep 0.5
done
echo "Did not come up in 30s — check $LOG" >&2
exit 1
