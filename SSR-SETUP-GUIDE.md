# SSR Manual Steps

Since package.json is read-only, you need to manually add these scripts to your package.json file:

## Scripts to Add

Open your package.json file and replace the "scripts" section with:

```json
"scripts": {
  "dev": "vite",
  "dev:ssr": "tsx server/index.ts",
  "build": "npm run build:client && npm run build:ssr",
  "build:client": "vite build",
  "build:ssr": "vite build --ssr src/entry-server.tsx --outDir dist/server",
  "build:dev": "vite build --mode development",
  "serve": "NODE_ENV=production node dist/server/index.js",
  "lint": "eslint .",
  "preview": "vite preview",
  "build:data": "tsc src/components/serviceAreaData.ts --outDir scripts/data --module NodeNext --target ES2020",
  "generate-sitemap": "echo \"Please run the command from the instructions and paste your keys directly.\""
}
```

## Testing SSR Locally

1. **CSR Development (current)**: `npm run dev` - Should continue to work as before
2. **SSR Development**: `npm run dev:ssr` - Will start the SSR server on http://localhost:5173
3. **Production Build**: `npm run build` - Creates both client and server builds
4. **Production Serve**: `npm run serve` - Runs the production SSR server

## Verification Steps

After adding the scripts:

1. Test CSR: `npm run dev` (should work as usual)
2. Test SSR: `npm run dev:ssr` (view source should show server-rendered HTML)
3. Check 404s: Visit `/nonexistent-page` (should show NotFoundPage with 404 status)
4. Check SEO: View source on any page should show title/meta tags in head