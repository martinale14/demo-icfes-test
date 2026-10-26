# Demo ICFES Tutor — Helmer Pardo

Demo de 4 preguntas de un tutor ICFES con IA. Arquitectura: Flutter (app móvil) + NestJS (backend, orquesta grading, dominio del estudiante, RAG en memoria y feedback de Claude).

Ver [`plan.md`](./plan.md) para el desglose de fases de implementación.

## Estructura

```
app/
├── backend/   NestJS + Prisma + SQLite + Anthropic SDK
└── mobile/    Flutter + Riverpod
```

## Backend

```bash
cd backend
npm install
cp .env.example .env   # agrega tu ANTHROPIC_API_KEY
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev      # http://localhost:3001
```

Variables en `.env`:
- `DATABASE_URL` — SQLite local (`file:./dev.db`, relativo a `prisma/`).
- `PORT` — puerto del servidor (default `3001`; se eligió distinto de 3000 para evitar choques con otros servicios locales).
- `ANTHROPIC_API_KEY` — requerida para el feedback real del tutor. Sin ella, el backend sigue funcionando pero devuelve un feedback de fallback fijo.
- `TUTOR_MODEL` — modelo de Claude a usar (default `claude-haiku-5-5`).

Para resetear los datos de la demo a un estado limpio (sin intentos previos):

- **Desde la app**: botón "Reiniciar demo" al final de la pantalla de afinidad vocacional — no requiere tocar la terminal ni reiniciar nada.
- **Desde la terminal** (reset completo de la base, incluyendo reseeding):
  ```bash
  rm -f prisma/dev.db && npx prisma migrate dev --name init && npx prisma db seed
  ```

### Tests

```bash
npm test
```

Cubre la fórmula de dominio (`MasteryService`), el ranking de afinidad vocacional (`CareersService`), los hints (`KnowledgeBaseService`) y la validación del esquema estructurado del tutor (`TutorResponseSchema`). No hay suite e2e — el guion de verificación manual de abajo cubre ese nivel para un demo de este tamaño.

### Docker

```bash
cd backend
docker build -t icfes-tutor-backend .
docker run -d -p 3001:3001 -e ANTHROPIC_API_KEY="sk-ant-..." icfes-tutor-backend
```

El contenedor aplica migraciones y re-siembra (idempotente — nunca toca intentos ya guardados) en cada arranque, luego inicia el servidor. `DATABASE_URL` y `PORT` ya tienen defaults razonables (`file:./dev.db`, `3001`); solo `ANTHROPIC_API_KEY` es obligatoria. La base SQLite vive dentro del contenedor — se pierde al eliminarlo, salvo que montes un volumen sobre `/app/prisma`. Verificado en vivo: migración + seed + arranque + una llamada real a `POST /attempts` con feedback de Claude, todo funcionando dentro del contenedor.

## Mobile (Flutter)

```bash
cd mobile
flutter pub get
flutter run   # con un emulador/simulador activo
```

La app no tiene login — usa un único estudiante demo sembrado por el backend. La URL base del backend se resuelve por plataforma en `lib/config/api_config.dart` (`10.0.2.2:3001` en el emulador Android, `localhost:3001` en el simulador iOS); si pruebas en un dispositivo físico, cambia esa URL a la IP de tu máquina en la red local.

## Guion de demo end-to-end

1. Con el backend corriendo y la app abierta, responde la pregunta 1 (porcentajes) correctamente → aparece el feedback del tutor en un chat.
2. Responde la pregunta 2 incorrectamente → el tutor identifica una posible causa del error antes de explicar, y permite un follow-up.
3. Responde las preguntas 3 y 4 (lectura crítica).
4. Al completar las 4, se muestra la pantalla de progreso con el dominio estimado por competencia.
