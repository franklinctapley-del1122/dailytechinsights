import { getLegacyPage, type PageId } from "@/lib/legacy";
import shared from "@/legacy/shared.json";

export default function LegacyPage({ id }: { id: PageId }) {
  const page = getLegacyPage(id);
  const body = page.body
    .replace(/<div[^>]*data-shared-header[^>]*>\s*<\/div>/gi, shared.header)
    .replace(/<div[^>]*data-shared-footer[^>]*>\s*<\/div>/gi, shared.footer);
  return (
    <>
      {page.styles ? <style dangerouslySetInnerHTML={{ __html: page.styles }} /> : null}
      {page.jsonLd.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />)}
      <div className="legacy-document" dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
