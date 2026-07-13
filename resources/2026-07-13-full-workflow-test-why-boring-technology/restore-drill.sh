#!/usr/bin/env bash
#
# restore-drill.sh — Rehearse a full PostgreSQL restore end to end and
# measure Time to Restore Service.
#
# INTENDED for a THROWAWAY target you are willing to lose. Never run against
# production. This script restores a pg_dump (custom format) or plain SQL dump
# into a fresh database and verifies basic correctness.
#
# Usage:
#   ./restore-drill.sh <backup-file> [expected_min_rows] [sentinel_query]
#
# Example:
#   ./restore-drill.sh /backups/prod-2026-07-13.dump 100000 \
#     "SELECT 1 FROM sentinel WHERE id = 'canary'"
#
# Env vars (with defaults):
#   PGHOST=localhost PGPORT=5432 PGUSER=postgres
#   DRILL_DB=restore_drill

set -euo pipefail

BACKUP_FILE="${1:?Provide a backup file path}"
EXPECTED_MIN_ROWS="${2:-0}"
SENTINEL_QUERY="${3:-}"

PGHOST="${PGHOST:-localhost}"
PGPORT="${PGPORT:-5432}"
PGUSER="${PGUSER:-postgres}"
DRILL_DB="${DRILL_DB:-restore_drill}"

export PGHOST PGPORT PGUSER

log() { echo "[$(date -u +%H:%M:%SZ)] $*"; }

if [[ ! -f "$BACKUP_FILE" ]]; then
  echo "ERROR: backup file not found: $BACKUP_FILE" >&2
  exit 1
fi

log "Starting restore drill against DB '$DRILL_DB' on $PGHOST:$PGPORT"
START_EPOCH=$(date +%s)

# 1. Cold start: drop and recreate target DB
log "Dropping and recreating target database (cold start)"
psql -d postgres -v ON_ERROR_STOP=1 -c "DROP DATABASE IF EXISTS ${DRILL_DB};"
psql -d postgres -v ON_ERROR_STOP=1 -c "CREATE DATABASE ${DRILL_DB};"

# 2. Restore from the real backup artifact
log "Restoring from $BACKUP_FILE"
if file "$BACKUP_FILE" | grep -qi 'PostgreSQL custom database dump'; then
  pg_restore --no-owner --no-privileges -d "$DRILL_DB" "$BACKUP_FILE"
else
  psql -v ON_ERROR_STOP=1 -d "$DRILL_DB" -f "$BACKUP_FILE"
fi

END_EPOCH=$(date +%s)
ELAPSED=$(( END_EPOCH - START_EPOCH ))
log "Restore completed in ${ELAPSED}s (this is your Time to Restore Service)"

# 3. Verify correctness, not just startup
if [[ "$EXPECTED_MIN_ROWS" -gt 0 ]]; then
  log "Verifying total row estimate meets >= ${EXPECTED_MIN_ROWS}"
  TOTAL=$(psql -tA -d "$DRILL_DB" -c \
    "SELECT COALESCE(SUM(n_live_tup),0) FROM pg_stat_user_tables;")
  log "Estimated live rows: ${TOTAL}"
  if [[ "${TOTAL:-0}" -lt "$EXPECTED_MIN_ROWS" ]]; then
    echo "FAIL: row estimate ${TOTAL} below expected ${EXPECTED_MIN_ROWS}" >&2
    exit 2
  fi
fi

if [[ -n "$SENTINEL_QUERY" ]]; then
  log "Running sentinel query"
  if psql -tA -v ON_ERROR_STOP=1 -d "$DRILL_DB" -c "$SENTINEL_QUERY" | grep -q 1; then
    log "Sentinel check PASSED"
  else
    echo "FAIL: sentinel query returned no expected row" >&2
    exit 3
  fi
fi

log "DRILL PASSED. Record ${ELAPSED}s and trend it over time."
