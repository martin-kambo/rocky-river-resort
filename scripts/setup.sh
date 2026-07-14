#!/usr/bin/env bash
# Rocky River Resort — first-time local development setup
set -euo pipefail

echo "═══════════════════════════════════════════════"
echo "  Rocky River Resort — Local Setup"
echo "═══════════════════════════════════════════════"

# 1. Check Node version
REQUIRED_NODE=20
CURRENT_NODE=$(node -v | cut -d. -f1 | tr -d 'v')
if [ "$CURRENT_NODE" -lt "$REQUIRED_NODE" ]; then
  echo "❌ Node.js $REQUIRED_NODE+ required (found $CURRENT_NODE)"
  echo "   Install via: nvm install $REQUIRED_NODE && nvm use $REQUIRED_NODE"
  exit 1
fi
echo "✅ Node $(node -v)"

# 2. Install dependencies
echo ""
echo "── Installing dependencies…"
npm install
echo "✅ Dependencies installed"

# 3. Copy env file
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ .env created from .env.example — fill in your secrets before running"
else
  echo "ℹ️  .env already exists — skipping"
fi

# 4. Start PostgreSQL via Docker
echo ""
echo "── Starting PostgreSQL…"
docker compose up postgres -d
echo "✅ PostgreSQL running"

# 5. Wait for PostgreSQL
echo ""
echo "── Waiting for PostgreSQL to be ready…"
sleep 3

# 6. Generate Prisma client
echo ""
echo "── Generating Prisma client…"
cd apps/api && npx prisma generate --silent
echo "✅ Prisma client generated"

# 7. Run migrations
echo ""
echo "── Running migrations…"
npx prisma migrate dev --name init
echo "✅ Migrations applied"

# 8. Seed database
echo ""
echo "── Seeding database…"
npm run db:seed
echo "✅ Database seeded"

cd ../..

echo ""
echo "═══════════════════════════════════════════════"
echo "  Setup complete! 🎉"
echo ""
echo "  Start development:"
echo "    npm run dev"
echo ""
echo "  API:     http://localhost:4000/api/v1"
echo "  Web:     http://localhost:3000/en"
echo "  Swagger: http://localhost:4000/api/docs"
echo "  Admin:   admin@rockyriverresort.co.ke / Admin@RRR2025!"
echo "═══════════════════════════════════════════════"