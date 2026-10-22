import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dailytechinsights.com"),
  title: {
    default: "DailyTechInsights — SaaS Reviews & Comparisons",
    template: "%s | DailyTechInsights",
  },
  description:
    "Independent SaaS reviews, software comparisons, alternatives, best software guides, and practical technology insights.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "DailyTechInsights",
    title: "DailyTechInsights — SaaS Reviews & Comparisons",
    description:
      "Independent SaaS reviews, software comparisons, alternatives, best software guides, and practical technology insights.",
    url: "https://www.dailytechinsights.com/",
  },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
