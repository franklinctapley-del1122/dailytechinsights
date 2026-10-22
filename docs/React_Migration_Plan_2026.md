# DailyTechInsights React Migration Plan

**Status:** Phase 1 implementation in progress — isolated React foundation added; build and QA not yet verified  
**Prepared:** 2026-10-22  
**Repository:** https://github.com/franklinctapley-del1122/dailytechinsights  
**Production domain:** https://www.dailytechinsights.com/  
**Strategy:** Parallel migration; modern design; preserve content and URLs  
**Proposed stack:** Next.js App Router + React + TypeScript + static export, hosted on a separate Netlify preview/site

## 1. Executive decision

Build a separate React version while the existing static HTML site remains the production source of truth. Do not replace the production branch, custom domain, or current deploy until the new version passes every release gate below.

Use Next.js rather than a client-only SPA because this is an SEO-focused editorial website. Generate static HTML for each route, preserve current URL shapes (including trailing slashes), and make sure meaningful page content and metadata are present in the initial HTML response.

This plan authorizes isolated implementation and staging work only. No production cutover is authorized. The initial React foundation now lives under `react/` on the `feature/react-migration-foundation` branch and is tracked in draft PR #1; build and browser QA remain outstanding.

## 2. Audit of the current repository

Audit performed against GitHub main on 2026-10-22.

### Findings
- Recursive repository tree: 153 entries, including 71 HTML files.
- Current sitemap: 68 URL entries. The 71-file versus 68-URL difference must be reconciled before migration. This does not by itself prove pages are missing from Google's index.
- No root package.json, lockfile, React source tree, or existing React build scripts were found.
- Current site is organized into reviews, categories, comparisons, alternatives, best-software pages, guides, trust pages, and legal pages.
- Review pages include Notion, ClickUp, HubSpot, Semrush, Slack, Pipedrive, Canva, and Salesforce.
- Shared HTML fragments exist in components/header.html and components/footer.html. JavaScript loaders exist in assets/site-header.js and assets/site-footer.js. Inspect their behavior before replacing them with React components.
- SEO and hosting files include sitemap.xml, robots.txt, llms.txt, llm.txt, netlify.toml, .htaccess, and vercel.json.
- Homepage currently has title “DailyTechInsights — SaaS Reviews & Comparisons”, canonical https://www.dailytechinsights.com/, robots index,follow, and H1 “Make Better Software Decisions with DailyTechInsights”.
- netlify.toml contains redirects from the apex domain and Netlify subdomain to the www canonical host, plus index.html normalization.
- .htaccess is Apache configuration and is not applied by Netlify static hosting. Netlify redirects should be managed and tested through Netlify configuration.
- vercel.json exists even though Netlify is the intended host. Treat it as legacy until its purpose is confirmed.
- Earlier account context reported Netlify production deploys paused due to operational-credit limits. Verify current deploy and preview availability before planning staging.
- This was a source-repository audit, not a full live crawl or browser QA. No live production change was made.

## 3. Non-negotiable migration principles

1. URL parity: preserve every existing public canonical URL unless an exception is documented and approved.
2. Content parity: preserve all copy, headings, tables, images, links, disclosures, pricing context, author details, dates, and editorial methodology. Do not silently rewrite or shorten content.
3. SEO parity: preserve title, meta description, canonical, robots, Open Graph/Twitter metadata, structured data, breadcrumbs, and internal links.
4. Static-first output: every indexable route must include meaningful article content in the initial HTML; do not depend on client-side fetching to reveal the page body.
5. Parallel delivery: work on a separate branch and separate Netlify preview/site. Keep main and the production domain unchanged until explicit approval.
6. No unverified redirects: do not change canonical host, trailing-slash behavior, or redirect rules without route-by-route tests.
7. Separate SEO and content work: React migration alone will not solve indexing issues.

## 4. Proposed architecture

Use Next.js App Router with TypeScript and static export.

Suggested structure:

    app/
      layout.tsx
      page.tsx
      not-found.tsx
      reviews/page.tsx
      reviews/[slug]/page.tsx
      categories/[slug]/page.tsx
      comparisons/[slug]/page.tsx
      alternatives/[slug]/page.tsx
      best/[slug]/page.tsx
      guides/[slug]/page.tsx
      sitemap.ts
      robots.ts
    components/
      SiteHeader.tsx
      SiteFooter.tsx
      Breadcrumbs.tsx
      ReviewCard.tsx
      ArticleLayout.tsx
      RelatedContent.tsx
    content/
      pages/
      reviews/
      guides/
      comparisons/
      alternatives/
      best/
    lib/
      routes.ts
      metadata.ts
      structured-data.ts
      content-inventory.ts
    public/
      images/
      favicon.ico
      llms.txt
      llm.txt

This is a proposed architecture, not a claim these files already exist. Build the route manifest first. Choose the simplest content representation that can preserve and validate the existing content; MDX or structured data may be used where appropriate. Do not manually retype or truncate pages without parity checks.

Configure static export and trailing-slash output to match current URLs, then verify actual generated files and preview responses. If a required feature cannot be statically exported, document and resolve the issue before implementation.

## 5. Four-week phased delivery

### Phase 0 — Freeze baseline and inventory (Week 1)
- Record the current main commit SHA as rollback reference.
- Parse all HTML paths and sitemap URLs into a route manifest.
- Reconcile the 71 HTML files against the 68 sitemap entries. Mark each route as indexable, utility, duplicate/redirect target, or intentionally excluded.
- For every route, record source path, public URL, page type, H1, title, meta description, canonical, robots, schema types, internal links, images, and content length.
- Inspect shared header/footer loaders, inline scripts, forms, tables, and image paths.
- Verify live HTTPS/canonical behavior, Netlify build settings, deploy limits, and preview capability.
- Exit gate: route differences explained; baseline and rollback reference recorded.

### Phase 1 — Isolated React foundation (Week 1–2)
- Create and work only on a migration branch; do not modify main.
- Add Next.js, React, TypeScript, lockfile, lint/build scripts, and static-export configuration.
- Implement reusable header/footer, navigation, typography, responsive layout, breadcrumbs, and accessible controls.
- Start with representative pages: homepage, reviews hub, one review detail, one guide, one comparison, one category, and one legal page.
- Preserve content unchanged and compare source against generated HTML.
- Exit gate: reproducible build succeeds and representative routes output static HTML.

### Phase 2 — Migrate every page type (Week 2–3)
- Migrate all remaining review, guide, comparison, alternatives, best, category, trust, and legal pages from the route manifest.
- Preserve the www canonical host and trailing-slash URL format.
- Preserve page content and metadata before any optional design refinements.
- Rebuild and verify internal links, related content, breadcrumbs, navigation, and footer links.
- Keep structured data only where appropriate and valid; do not invent ratings, authors, hands-on testing, or pricing claims.
- Exit gate: every inventory route has an output or a documented approved exception.

### Phase 3 — SEO and technical QA (Week 3)
- Validate sitemap XML and URL parity; check duplicates, missing routes, and stale URLs.
- Check one correct canonical per page, title, description, H1, robots directives, breadcrumbs, schema JSON-LD, Open Graph, and Twitter metadata.
- Test every sitemap URL against the preview; intentional missing pages must return real 404s.
- Find broken links, missing assets, console/hydration errors, layout overflow, and mobile issues.
- Confirm initial HTML includes main content and metadata before client JavaScript runs.
- Compare source/output text and content length to catch missing paragraphs, tables, and FAQs.
- Test keyboard navigation, responsive layouts, image loading, accessibility basics, and performance.
- Exit gate: no critical route, SEO, rendering, or content-parity failures.

### Phase 4 — Separate Netlify staging (Week 3–4)
- Deploy the migration branch to a separate Netlify preview or separate Netlify site.
- Do not point dailytechinsights.com or www.dailytechinsights.com at staging.
- Verify preview deploys are available under the current Netlify account/credit state. If not, use a local production build and another non-production preview method.
- Test representative pages on desktop and mobile and run the full route/metadata suite.
- Exit gate: QA checklist completed and owner approves staging.

### Phase 5 — Controlled release (requires separate approval)
- Prepare a release checklist and rollback procedure only after staging passes.
- Confirm production deploy capability and record the last known-good deployment.
- Change the existing production site only after explicit approval.
- Test homepage, key landing pages, sample reviews/guides, sitemap, robots, canonicals, redirects, HTTPS, and 404 behavior after release.
- Keep the previous static version/commit available for rollback.
- Monitor Search Console coverage, crawl errors, and sitemap processing for subsequent weeks.

## 6. Release acceptance checklist

- [ ] Every existing public URL maps to a generated route or an approved documented exception.
- [ ] Existing content is preserved and compared against source.
- [ ] The 71 HTML file versus 68 sitemap URL discrepancy is explained.
- [ ] Canonical host remains https://www.dailytechinsights.com.
- [ ] Trailing-slash behavior remains consistent.
- [ ] No unplanned redirects, 404s, or 5xx responses.
- [ ] No accidental noindex/nofollow or robots blocking.
- [ ] Sitemap and robots.txt are valid for the intended production domain.
- [ ] Main content is present in initial HTML for all indexable pages.
- [ ] JSON-LD parses and matches visible content.
- [ ] Internal links and assets resolve.
- [ ] Separate Netlify staging has been reviewed and approved.
- [ ] Rollback plan is ready.
- [ ] Explicit owner approval is recorded before production cutover.

## 7. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Indexing declines after migration | URL/metadata parity, static HTML, route tests, preserved sitemap and internal links. |
| Content omitted during conversion | Inventory, source/output text comparison, page-type review. |
| Trailing-slash or canonical mismatch | Explicit export configuration and route-level tests. |
| Netlify limits block staging | Verify deploy credits early; do not alter production settings to work around limits. |
| Redirect configurations conflict | Audit netlify.toml and test rules; do not rely on .htaccess on Netlify. |
| Rewrite becomes unnecessarily complex | Migrate by page type, reuse components, and avoid adding a CMS/database without a concrete need. |
| Migration is mistaken for content improvement | Track technical parity and editorial quality as separate workstreams. |

## 8. Immediate next actions

1. Complete the route inventory and explain sitemap/file-count differences.
2. Inspect shared header/footer fragments and their JavaScript loaders.
3. Set up a reproducible Next.js static build on the migration branch.
4. Migrate the representative page set and run parity tests.
5. Expand to all routes only after representative pages pass.
6. Keep production unchanged until staging is verified and explicitly approved.

## 9. Official references

- Next.js static exports: https://nextjs.org/docs/app/guides/static-exports
- Next.js metadata and Open Graph: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js sitemap convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap

**Safety rule:** This plan authorizes planning and isolated staging only. It does not authorize replacing production, changing DNS, changing production Netlify configuration, or removing the existing static site.
