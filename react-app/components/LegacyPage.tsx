import { getLegacyPage, type PageId } from "@/lib/legacy";

function keepPreviewNavigation(html: string): string {
  // Keep internal links on the Vercel preview instead of sending reviewers to production.
  return html.replace(/(href\s*=\s*["'])https?:\/\/(?:www\.)?dailytechinsights\.com(?=\/|["'])/gi, "$1");
}

export default function LegacyPage({ id }: { id: PageId }) {
  const page = getLegacyPage(id);
  const body = keepPreviewNavigation(page.body);
  return (
    <>
      {page.styles ? <style dangerouslySetInnerHTML={{ __html: page.styles }} /> : null}
      {page.jsonLd.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />)}
      <div className="legacy-document" dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
