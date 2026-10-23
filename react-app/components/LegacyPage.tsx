import parse from "html-react-parser";
import type { ReactNode } from "react";
import { getLegacyPage, type PageId } from "@/lib/legacy";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

function removeLegacyNavigation(markup: string): string {
  // Legacy HTML pages already contain their original site navigation. Remove
  // only header/nav blocks that include the old primary menu, keeping article
  // headers and other page content intact.
  return markup
    .replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, (block) =>
      /Reviews/i.test(block) && /Categories/i.test(block) && /Comparisons/i.test(block) ? "" : block
    )
    .replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, (block) =>
      /Reviews/i.test(block) && /Categories/i.test(block) && /Comparisons/i.test(block) ? "" : block
    )
    .replace(/<div\b[^>]*class=["'][^"']*(?:site-header|main-header|legacy-header|header-container)[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, (block) =>
      /Reviews/i.test(block) && /Categories/i.test(block) && /Comparisons/i.test(block) ? "" : block
    )
    .replace(/<div[^>]*data-shared-header[^>]*>\s*<\/div>/gi, "")
    .replace(/<div[^>]*data-shared-footer[^>]*>\s*<\/div>/gi, "");
}

export default function LegacyPage({ id }: { id: PageId }) {
  const page = getLegacyPage(id);
  const body = removeLegacyNavigation(page.body);
  return (
    <>
      {page.styles ? <style dangerouslySetInnerHTML={{ __html: page.styles }} /> : null}
      {page.jsonLd.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />)}
      <SiteHeader />
      <main className="legacy-document">{parse(body) as ReactNode}</main>
      <SiteFooter />
    </>
  );
}
