import { getLegacyPage, type PageId } from "@/lib/legacy";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

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
      <main className="legacy-document" dangerouslySetInnerHTML={{ __html: body }} />
      <SiteFooter />
    </>
  );
}
