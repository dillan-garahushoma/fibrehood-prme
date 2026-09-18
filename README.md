# Fibrehood

Fibrehood is a modern connectivity website designed and built by Dillan
Garahushoma. It presents Fibrehood's internet plans, coverage information,
support content, partner information, and customer sign-up journeys in one
responsive web experience.

## Built With

- React
- Vite
- React Router
- Tailwind CSS
- Cloudflare Pages Functions
- Cloudflare KV for lead capture

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```bash
npm install
npm run dev
```

The development site is available at `http://localhost:5173`.

## Available Commands

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
npm run lint      # Check the codebase with ESLint
npm run typecheck # Run the JavaScript/TypeScript project checks
```

## Project Structure

- `src/` contains the React application, pages, components, hooks, and data.
- `public/` contains static files, redirects, and public image assets.
- `functions/` contains the Cloudflare Pages Function for lead capture.
- `DEPLOY.md` contains the full Cloudflare Pages and KV deployment guide.

## Lead Capture

The sign-up and contact forms send requests to `/api/lead`. In production,
the Cloudflare Pages Function stores submitted leads in a KV namespace bound as
`LEADS`.

To run the site locally with the lead endpoint:

```bash
npm run build
npx wrangler pages dev dist --kv LEADS
```

## Deployment

The site is deployed to Cloudflare Pages:

1. Create a Cloudflare KV namespace for lead storage.
2. Add its namespace ID to `wrangler.jsonc`.
3. Connect this repository to Cloudflare Pages.
4. Use `npm run build` as the build command and `dist` as the output directory.

See [DEPLOY.md](DEPLOY.md) for the complete deployment steps.

## Ownership

This is my Fibrehood website project, designed, built, and maintained by
Dillan Garahushoma.
