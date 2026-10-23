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
  return (
    <>
      {page.styles ? <style dangerouslySetInnerHTML={{ __html: page.styles }} /> : null}
      {page.jsonLd.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />)}
      <SiteHeader />
      <main className="legacy-document">
        {parse(body, { replace: (node) => isLegacyPrimaryMenu(node) ? <></> : undefined }) as ReactNode}
      </main>
      <SiteFooter />
    </>
  );
}
