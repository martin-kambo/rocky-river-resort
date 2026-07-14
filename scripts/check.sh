#!/usr/bin/env bash
# Rocky River Resort — pre-commit quality check
# Run before every commit. Mirrors the CI lint + test jobs.
set -euo pipefail

echo "═══════════════════════════════════════"
echo "  Pre-commit checks"
echo "═══════════════════════════════════════"

echo ""
echo "── Generating Prisma client…"
cd apps/api && npx prisma generate --silent && echo "✅ Prisma client generated"
cd ../..

echo ""
echo "── Type checking API…"
cd apps/api && npx tsc --noEmit && echo "✅ API types OK"
cd ../..

echo ""
echo "── Type checking Web…"
cd apps/web && npx tsc --noEmit && echo "✅ Web types OK"
cd ../..

echo ""
echo "── Running all tests…"
cd apps/api && npx jest --passWithNoTests --forceExit --no-coverage && echo "✅ All tests pass"
cd ../..

echo ""
echo "── Regression checks…"
if grep -r "from 'bullmq'\|from '@nestjs/bullmq'\|from 'ioredis'\|@sendgrid" \
     apps/api/src --include="*.ts" 2>/dev/null; then
  echo "❌ Removed dependency found in source — check your imports"
  exit 1
else
  echo "✅ No removed dependencies found"
fi

echo ""
echo "═══════════════════════════════════════"
echo "  All checks passed ✅"
echo "═══════════════════════════════════════"