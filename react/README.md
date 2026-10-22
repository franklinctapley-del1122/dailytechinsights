# DailyTechInsights React staging app

This app is a **parallel migration**, not the production website. The existing static HTML pages at the repository root remain the source of truth and are not replaced by this app.

## Stack and behavior

- Next.js App Router + React + TypeScript.
- Static export with trailing slashes.
- The catch-all route enumerates legacy `index.html` pages at build time, then carries forward their existing body markup, page title, description, canonical URL, robots directives, Open Graph/Twitter fields, inline head styles, and JSON-LD structured data.
- A React header and footer replace the old shared-header/footer placeholders. Existing article copy, tables, links and body markup are retained as the first migration pass.
- Public assets and SEO files are copied into this app's `public/` directory before build.

This compatibility bridge is an intentionally cautious first implementation. It does not yet count as a fully redesigned or release-approved site; compare each page against production and refine shared styling/page templates before any cutover.

## Local build

From this directory:

```bash
npm install
npm run typecheck
npm run build
```

Static output is written to `out/`. Do not commit `node_modules`, `.next`, or `out`.

## Staging deployment

Create a separate Netlify site or deploy-preview configuration for this branch. Do not attach `dailytechinsights.com` or `www.dailytechinsights.com` to the staging site. Use `react` as the base directory, `npm run build` as the build command, and `out` as the publish directory, subject to the current Netlify account's deploy-credit status. Preview builds are `noindex,nofollow` by default; only set `NEXT_PUBLIC_SITE_STAGE=production` after explicit approval and after all release gates pass.

The root `netlify.toml` and production DNS/domain settings are intentionally untouched.

## Required release gates

- Reconcile the current HTML-file and sitemap URL inventories.
- Build successfully and confirm all intended routes were exported.
- Compare each route's title, description, canonical, robots, structured data, visible content and links with the legacy page.
- Check desktop/mobile layouts, internal links, images, 404 behavior, trailing slashes, redirects and HTTPS on a separate staging URL.
- Confirm no indexable route becomes a thin client-only shell.
- Obtain explicit approval before changing production branch, Netlify production configuration, custom domains or DNS.
