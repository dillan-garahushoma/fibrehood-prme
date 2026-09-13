import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Standalone Vite config — no Base44 plugin.
// Builds a static bundle in dist/ deployable to Cloudflare Pages.
export default defineConfig({
  plugins: [
    react(),
  ]
});