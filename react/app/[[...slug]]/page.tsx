import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllLegacyRoutes, getLegacyPage, legacyMetadata } from "../../lib/legacy-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLegacyRoutes();
}

type PageProps = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getLegacyPage(slug);
  return page ? legacyMetadata(page) : {};
}

export default async function LegacyPageRoute({ params }: PageProps) {
  const { slug = [] } = await params;
  const page = getLegacyPage(slug);
  if (!page) notFound();

  return (
    <main className="pageShell">
      {page.styles.map((css, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: css }} />
      ))}
      {page.structuredData.map((json, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <article className="legacyContent" dangerouslySetInnerHTML={{ __html: page.bodyHtml }} />
    </main>
  );
}
