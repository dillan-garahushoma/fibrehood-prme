# FibreHood — Standalone Deployment

This site is fully standalone — no Base44 dependencies. It builds to a static
bundle hosted on **Cloudflare Pages**, with a single Pages Function for lead
capture stored in **Cloudflare KV**.

## Build

```bash
npm install
npm run build        # outputs the static site to dist/
```

## Lead capture

Signups and contact forms `POST` to `/api/lead`, handled by
`functions/api/lead.js` (a Cloudflare Pages Function). Each lead is stored in a
KV namespace bound as `LEADS`.

## Run locally (with the lead API)

```bash
npm run build
npx wrangler pages dev dist --kv LEADS
```

`wrangler pages dev` serves `dist/` and the `functions/` directory together,
with a local KV instance — leads are stored in-memory for the session.

## Deploy to Cloudflare Pages

1. **Create a KV namespace** named `LEADS`:
   Cloudflare dashboard → Workers & Pages → KV → Create namespace.
2. **Put its ID in `wrangler.jsonc`** → replace
   `REPLACE_WITH_YOUR_KV_NAMESPACE_ID`.
3. **Deploy** (choose one):
   - Git-connect the repo in Cloudflare Pages (build command `npm run build`,
     output dir `dist`); the `functions/` directory and KV binding are picked
     up from `wrangler.jsonc` automatically.
   - Or run `npx wrangler pages deploy dist`.

## Notes

- SPA routing is handled by `public/_redirects` (`/* → /index.html 200`).
  `/api/lead` is served by the Pages Function and takes precedence over the
  redirect.
- The four auth pages (`/login`, `/register`, `/forgot-password`,
  `/reset-password`) render a "coming soon" placeholder — they're kept so
  existing links don't break.