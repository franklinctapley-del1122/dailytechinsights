# DailyTechInsights React migration pilot

This isolated Next.js, React and TypeScript pilot is NOT production. It currently includes four representative routes while content and SEO parity are checked.

Pilot routes: /, /reviews/, /reviews/salesforce-review/, and /guides/project-management-vs-task-management/.

The original HTML for these four pages is preserved verbatim in legacy/pages.json. The pilot extracts original titles, descriptions, canonical URLs, robots directives, structured data, head styles and body content at build time. This first pass prioritizes parity and static rendering; modern shared-component redesign and remaining routes are subsequent phases.

Use Node.js 20 or later. Run npm install and npm run dev from this directory. To build a static export, set DTI_PREVIEW_NOINDEX=true and run npm run build. The generated site is in the out directory.

Keep the existing production branch and Netlify site unchanged. For a separate preview use base directory react-app and publish directory out. Verify preview HTML has noindex,nofollow and has no production-domain redirects before sharing it. This pilot does not include every production URL; do not treat it as a complete replacement or cut over the domain. Netlify previously reported operational-credit limits, so verify preview-build availability first.

For each pilot route compare exported HTML with the source for title, description, canonical, robots, JSON-LD, H1, content, internal links and trailing-slash behavior.
