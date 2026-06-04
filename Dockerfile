# ─── Stage 1 : installation des dépendances de production ─────────────────
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ─── Stage 2 : image de production finale ─────────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Uniquement node_modules propre + code source (sans tests, monitoring, k8s…)
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src

EXPOSE 3000
CMD ["node", "src/app.js"]
