#!/usr/bin/env bash
# Rocky River Resort — production migration script
# Run from Render Shell or as a one-off job before deploy.
# Requires DATABASE_URL to be set in the environment.
set -euo pipefail

echo "═══════════════════════════════════════════════"
echo "  Rocky River Resort — Production Migration"
echo "═══════════════════════════════════════════════"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "❌ DATABASE_URL is not set"
  exit 1
fi

echo ""
echo "── Running Prisma migrations (deploy mode)…"
echo "   Using: ${DATABASE_URL:0:40}…"
cd apps/api
npx prisma migrate deploy
echo "✅ Migrations complete"

echo ""
echo "── Checking migration status…"
npx prisma migrate status
cd ../..

echo ""
echo "═══════════════════════════════════════════════"
echo "  Migration complete! ✅"
echo "═══════════════════════════════════════════════"