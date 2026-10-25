import type { Metadata } from "next";
import FreeToolClient from "@/components/FreeToolClient";

export const metadata: Metadata = {
  title: "Free Meta Title & Description Checker | DailyTechInsights",
  description: "Check SEO title and meta description character counts, preview a search snippet, and improve your page metadata with this free browser-based tool.",
  alternates: { canonical: "https://www.dailytechinsights.com/tools/meta-title-description-checker/" },
  robots: { index: true, follow: true },
};

export default function MetaTitleDescriptionCheckerPage() {
  return <FreeToolClient tool="meta" />;
}
