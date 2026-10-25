# syntax=docker/dockerfile:1

# ---- Builder ---------------------------------------------------------------
FROM node:22-slim AS builder
WORKDIR /app

# Prisma's query engine needs OpenSSL on Debian-based images.
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

COPY . .
# prisma.config.ts requires DATABASE_URL to be set to even load (via env()),
# though `generate` itself never connects to a database — this placeholder
# matches the runtime default and is only used at build time.
ENV DATABASE_URL="file:./dev.db"
RUN npx prisma generate
RUN npm run build

# ---- Runtime ----------------------------------------------------------------
FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

# Kept as a full `npm ci` install (devDependencies included) rather than a
# pruned production install: the entrypoint runs `prisma migrate deploy` +
# `prisma db seed` on container start, and the seed command needs `tsx` plus
# the Prisma CLI, both of which are devDependencies. Fine for a demo image;
# a leaner prod image would move migrate/seed to a separate one-off job.
# Sensible defaults so the image runs with just ANTHROPIC_API_KEY passed in;
# override either at `docker run` time if needed.
ENV DATABASE_URL="file:./dev.db"
ENV PORT=3001

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/package.json ./package.json

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

# Matches the project's default PORT (chosen to avoid a local port 3000
# conflict during development — see plan.md); override with -e PORT=... .
EXPOSE 3001

# DATABASE_URL defaults to prisma/dev.db inside the image, which is lost
# when the container is removed. Mount a volume over /app/prisma (or pass
# a different DATABASE_URL) to persist data across restarts.
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/main.js"]
