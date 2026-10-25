#!/bin/sh
set -e

# Applies pending migrations (no-op if already up to date) and re-seeds the
# 5 skills + 15 questions. seed.ts uses upserts keyed by order/code, so this
# is safe to run on every boot — it never touches existing Attempt rows.
npx prisma migrate deploy
npx prisma db seed

exec "$@"
