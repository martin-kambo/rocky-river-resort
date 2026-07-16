# ── Build stage ───────────────────────────────────────────────────────────────
# Built from the MONOREPO ROOT — not from apps/api/
# Render settings: Root Directory = (blank), Dockerfile = apps/api/Dockerfile

FROM node:20-alpine AS builder
WORKDIR /app

# Copy root workspace manifest first (layer cache optimisation)
COPY package.json ./
COPY package-lock.json* ./

# Copy package manifests for each workspace
COPY packages/types/package.json  ./packages/types/package.json
COPY packages/utils/package.json  ./packages/utils/package.json
COPY apps/api/package.json        ./apps/api/package.json

# Install all workspace dependencies
RUN npm ci --workspace=apps/api --include-workspace-root

# Copy full source
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

# Generate Prisma client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build NestJS
RUN npm run build

# ── Production stage ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy compiled output
COPY --from=builder /app/apps/api/dist       ./dist
COPY --from=builder /app/apps/api/prisma     ./prisma
COPY --from=builder /app/apps/api/package.json ./package.json

# Copy node_modules (root workspace + api workspace)
COPY --from=builder /app/node_modules        ./node_modules
COPY --from=builder /app/packages            ./packages

EXPOSE 4000
CMD ["node", "dist/main"]