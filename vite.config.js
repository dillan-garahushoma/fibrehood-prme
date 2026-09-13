import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { processLead } from './base44/functions/lib/lead/entry.js'

// Standalone Vite config — no Base44 plugin.
// Builds a static bundle in dist/ deployable to Cloudflare Pages.
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'lead-api-dev',
      configureServer(server) {
        const store = new Map();
        server.middlewares.use(async (req, res, next) => {
          if (req.method !== 'POST' || req.url !== '/api/lead') return next();
          try {
            const chunks = [];
            for await (const chunk of req) chunks.push(chunk);
            const body = JSON.parse(Buffer.concat(chunks).toString() || '{}');
            const result = processLead(body);
            if (!result.ok) {
              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: result.error }));
              return;
            }
            store.set(result.reference, result.record);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, reference: result.reference }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Unable to submit lead.' }));
          }
        });
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});