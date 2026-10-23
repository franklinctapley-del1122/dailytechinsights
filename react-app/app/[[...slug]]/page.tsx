import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacyPage from "@/components/LegacyPage";
import ModernHome from "@/components/ModernHome";
import HubPage from "@/components/HubPage";
import { getLegacyMetadata, getRouteIds, resolvePageId } from "@/lib/legacy";

export const dynamicParams = false;
const redesignedHubs = new Set(["reviews", "categories", "comparisons", "alternatives", "best", "guides"]);
export function generateStaticParams() {
  return getRouteIds().map((id) => ({ slug: id === "home" ? [] : id.split("/") }));
}
type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = resolvePageId(slug);
  if (id && redesignedHubs.has(id)) {
    const titles: Record<string, string> = {
      reviews: "SaaS Reviews | DailyTechInsights", categories: "Software Categories | DailyTechInsights",
      comparisons: "Software Comparisons | DailyTechInsights", alternatives: "Software Alternatives | DailyTechInsights",
      best: "Best Software for Your Needs | DailyTechInsights", guides: "Software Guides & How-To Articles | DailyTechInsights",
    };
    const descriptions: Record<string, string> = {
      reviews: "Explore practical SaaS reviews to understand features, strengths, trade-offs, and software fit for your business.",
      categories: "Browse software categories and find tools for CRM, marketing, productivity, project management, and business workflows.",
      comparisons: "Compare software options, understand meaningful differences, and choose tools that fit your team's needs.",
      alternatives: "Explore software alternatives and find tools that better match your needs, workflows, and budget.",
      best: "Discover curated software picks for common business needs, workflows, and practical use cases.",
      guides: "Read practical software guides and explainers to understand tools, improve workflows, and make better software decisions.",
    };
    return {
      title: titles[id],
      description: descriptions[id],
      alternates: { canonical: `https://www.dailytechinsights.com/${id}/` },
      robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
      openGraph: { type: "website", url: `https://www.dailytechinsights.com/${id}/`, siteName: "DailyTechInsights", title: titles[id], description: descriptions[id], locale: "en_US" },
      twitter: { card: "summary_large_image", title: titles[id], description: descriptions[id] },
    };
  }
  return id ? getLegacyMetadata(id) : { title: "Page not found | DailyTechInsights", robots: { index: false, follow: false } };
}
export default async function SiteRoute({ params }: Props) {
  const { slug } = await params;
  const id = resolvePageId(slug);
  if (!id) notFound();
  if (id === "home") return <ModernHome />;
  if (redesignedHubs.has(id)) return <HubPage id={id} />;
  return <LegacyPage id={id} />;
}
