# AGENTS.md

## Project Context

FibreHood is a standalone Vite + React frontend (no Base44 SDK runtime
dependency). It checks fibre coverage, compares plans, and captures leads.

The app is fully self-contained: auth is stubbed (`src/lib/AuthContext.jsx`
+ `src/api/base44Client.js`), the `/api/lead` endpoint runs as an in-memory
Vite dev middleware (`vite.config.js`), and coverage data comes from local
fixtures (`src/data/`, `src/lib/coverageService.js`). No database, no
external API keys, no backend service beyond Vite itself.

## Running in Base44

```bash
docker compose -f docker-compose.base44.yml up -d
```

- Single `web` service: `node:22` base image, repo bind-mounted at `/app`,
  `npm install` + `npx vite --host 0.0.0.0 --port 3000` on startup.
- Live reload via Vite HMR — edits appear in the preview without a rebuild.
- Port 3000 is the public entry point.
- No secrets required.

## Key Files

- `src/`: frontend application source.
- `src/api/base44Client.js`: standalone stub — no Base44 SDK dependency.
- `vite.config.js`: Vite config with a custom `/api/lead` dev middleware.
- `base44/functions/lib/lead/entry.js`: shared lead validation logic.
- `src/data/`: coverage areas, plans, pricing, and other fixtures.
- `src/lib/coverageService.js`: coverage resolution engine (local fixtures).

## Working Notes

- Run `npm run lint` and `npm run typecheck` before finishing code changes.
- The `.npmrc` enforces a 7-day supply-chain cooldown (`min-release-age=7`).
- `wrangler.jsonc` is for Cloudflare Pages deployment only — not used locally.
