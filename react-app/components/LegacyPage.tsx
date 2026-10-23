import parse from "html-react-parser";
import type { ReactNode } from "react";
import { getLegacyPage, type PageId } from "@/lib/legacy";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const primaryMenuLabels = ["Reviews", "Categories", "Comparisons", "Alternatives", "Best Software", "Guides"];
const primaryMenuPaths = ["reviews", "categories", "comparisons", "alternatives", "best", "guides"];

function childNodes(node: any): any[] {
  return Array.isArray(node?.children) ? node.children : [];
}

function textOf(node: any): string {
  if (node?.type === "text") return node.data ?? "";
  return childNodes(node).map(textOf).join(" ");
}

function linksOf(node: any): string[] {
  const own = node?.name === "a" && node?.attribs?.href ? [node.attribs.href] : [];
  return own.concat(...childNodes(node).map(linksOf));
}

function isLegacyPrimaryMenu(node: any): boolean {
  if (node?.type !== "tag" || !["header", "nav", "div"].includes(node.name)) return false;
  const links = linksOf(node).map((href) => href.toLowerCase().replace(/index\.html(?:[?#].*)?$/, ""));
  const text = textOf(node).toLowerCase().replace(/\s+/g, " ");
  const matchedLabels = primaryMenuLabels.filter((label) => text.includes(label.toLowerCase()));
  const matchedPaths = primaryMenuPaths.filter((path) =>
    links.some((href) => new RegExp(`(?:^|/)${path}(?:/|[?#]|$)`).test(href.replace(/^https?:\/\/[^/]+/, "")))
  );
  // Only remove a wrapper that contains the complete old site menu, not
  // article headings or individual content links.
  return matchedLabels.length >= 5 && matchedPaths.length >= 5;
}

export default function LegacyPage({ id }: { id: PageId }) {
  const page = getLegacyPage(id);
  const body = page.body
    .replace(/<div[^>]*data-shared-header[^>]*>\s*<\/div>/gi, "")
    .replace(/<div[^>]*data-shared-footer[^>]*>\s*<\/div>/gi, "");
  const isGuideArticle = id.startsWith("guides/") && id !== "guides";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": page.canonical },
    url: page.canonical,
    publisher: { "@type": "Organization", name: "DailyTechInsights", url: "https://www.dailytechinsights.com/" },
    inLanguage: "en-US",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.dailytechinsights.com/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://www.dailytechinsights.com/guides/" },
      { "@type": "ListItem", position: 3, name: page.title, item: page.canonical },
    ],
  };
  const hasArticleSchema = page.jsonLd.some((schema) => /"@type"\s*:\s*"(Article|BlogPosting|TechArticle)"/i.test(schema));
  return (
    <>
      {page.styles ? <style dangerouslySetInnerHTML={{ __html: page.styles }} /> : null}
      {page.jsonLd.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />)}
      {isGuideArticle && !hasArticleSchema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /> : null}
      {isGuideArticle ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /> : null}
      <SiteHeader />
      <main className={isGuideArticle ? "legacy-document guide-article-page" : "legacy-document"}>
        {isGuideArticle ? <div className="guide-article-shell"><nav className="guide-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/guides/">Guides</a><span aria-hidden="true">/</span><span aria-current="page">{page.title}</span></nav><div className="guide-reading-note"><span className="guide-reading-mark">DTI</span><span><strong>DailyTechInsights Guide</strong><small>Practical software and digital-work advice</small></span></div>{parse(body, { replace: (node) => isLegacyPrimaryMenu(node) ? <></> : undefined }) as ReactNode}<aside className="guide-next-steps"><p className="guide-next-kicker">KEEP EXPLORING</p><h2>Make a more confident software decision</h2><p>Use our practical guides, in-depth reviews, and comparisons to evaluate tools against your workflow, budget, and team needs.</p><div><a href="/reviews/">Read software reviews <span aria-hidden="true">→</span></a><a href="/comparisons/">Compare software <span aria-hidden="true">→</span></a><a href="/guides/">Browse all guides <span aria-hidden="true">→</span></a></div></aside></div> : parse(body, { replace: (node) => isLegacyPrimaryMenu(node) ? <></> : undefined }) as ReactNode}
      </main>
      <SiteFooter />
    </>
  );
}
