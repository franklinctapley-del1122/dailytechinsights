import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacyPage from "@/components/LegacyPage";
import ModernHome from "@/components/ModernHome";
import { getLegacyMetadata, getRouteIds, resolvePageId } from "@/lib/legacy";

export const dynamicParams = false;

export function generateStaticParams() {
  return getRouteIds().map((id) => ({ slug: id === "home" ? [] : id.split("/") }));
}

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = resolvePageId(slug);
  return id ? getLegacyMetadata(id) : { title: "Page not found | DailyTechInsights", robots: { index: false, follow: false } };
}

export default async function SiteRoute({ params }: Props) {
  const { slug } = await params;
  const id = resolvePageId(slug);
  if (!id) notFound();
  if (id === "home") return <ModernHome />;
  return <LegacyPage id={id} />;
}
