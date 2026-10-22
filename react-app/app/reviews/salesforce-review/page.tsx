import type { Metadata } from "next";
import data from "@/content/salesforce-review.json";
import { LegacyPage } from "@/components/legacy-page";

export const metadata: Metadata = {
  title: "Salesforce Review 2026: Features, Pricing & Alternatives",
  description: "Salesforce review covering Sales Cloud features, 2026 pricing, AI, automation, reporting, implementation trade-offs, best-fit teams and alternatives.",
  alternates: { canonical: "/reviews/salesforce-review/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "article",
    title: "Salesforce Review 2026: Features, Pricing & Alternatives | DailyTechInsights",
    description: "A practical assessment of Salesforce Sales Cloud features, published pricing, strengths, limitations and business fit.",
    url: "/reviews/salesforce-review/",
  },
};

export default function SalesforceReviewPage() {
  return <LegacyPage data={data} />;
}
