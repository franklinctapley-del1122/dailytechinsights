# DailyTechInsights React migration (parallel preview)

This is an isolated Next.js + React + TypeScript implementation under `react-app/`. It does not change the existing static HTML production build or Netlify root configuration.

## Local development

```bash
cd react-app
npm install
npm run dev
```

## Static export

```bash
npm run typecheck
npm run build
```

Next.js writes the static site to `out/` because `output: "export"` and `trailingSlash: true` are configured.

## Current scope

- React app shell, responsive navigation/footer and modern design tokens.
- Homepage design pilot.
- Reviews hub pilot with the eight current review destinations.
- Existing HTML production pages remain untouched while content and metadata parity are audited.

## Important limitations before staging

This is the first implementation slice, not a release candidate. Most old routes have not yet been migrated to React; links in the pilot may point to routes not built in this app yet. The Salesforce review and project-management guide must be migrated with full content, metadata, structured data and internal links before this pilot can pass parity checks. Do not point the production domain at this folder or replace the root Netlify build. First configure a separate Netlify preview/site with base directory `react-app`, verify build credits are available, and complete the migration checklist in `../docs/React_Migration_Plan_2026.md`.
