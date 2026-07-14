# ── Install deps for building (incl. devDependencies) ──────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json ./apps/api/package.json
RUN npm ci --workspace=apps/api --include-workspace-root

# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY . .
RUN npx prisma generate --schema=apps/api/prisma/schema.prisma
RUN npm run build --workspace=apps/api

# ── Prune to production-only deps ────────────────────────────────────────────
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json ./apps/api/package.json
RUN npm ci --workspace=apps/api --include-workspace-root --omit=dev

# ── Production stage ──────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
EXPOSE 4000
CMD ["node", "apps/api/dist/main"]