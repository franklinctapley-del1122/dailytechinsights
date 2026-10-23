import parse from "html-react-parser";
import type { ReactNode } from "react";
import { getLegacyPage, type PageId } from "@/lib/legacy";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const primaryMenuLabels = ["Reviews", "Categories", "Comparisons", "Alternatives", "Best Software", "Guides"];

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
  const links = linksOf(node);
  const text = textOf(node).toLowerCase();
  const matchedLabels = primaryMenuLabels.filter((label) => text.includes(label.toLowerCase()));
  const matchedRoutes = ["/reviews/", "/categories/", "/comparisons/", "/alternatives/", "/best/", "/guides/"]
    .filter((route) => links.some((href) => href.replace(/index\.html$/i, "").includes(route)));
  return matchedLabels.length >= 5 && matchedRoutes.length >= 5;
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
