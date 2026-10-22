import type { ReactNode } from "react";

type LegacyPageData = { source: string; styles: string; html: string };

export function LegacyPage({ data }: { data: LegacyPageData }) {
  return (
    <article className="legacy-page">
      <style dangerouslySetInnerHTML={{ __html: data.styles }} />
      <div dangerouslySetInnerHTML={{ __html: data.html }} />
    </article>
  );
}
