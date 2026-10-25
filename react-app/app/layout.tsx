import type { Metadata } from "next";
import "./globals.css";
import "./homepage-polish.css";

const siteUrl = "https://dailytechinsights.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DailyTechInsights | SaaS Reviews, Software Comparisons & Guides",
    template: "%s",
  },
  description: "Make informed software decisions with practical SaaS reviews, software comparisons, alternatives, best-software guides, and actionable business technology insights.",
  applicationName: "DailyTechInsights",
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "DailyTechInsights",
    title: "DailyTechInsights | SaaS Reviews, Software Comparisons & Guides",
    description: "Practical SaaS reviews, software comparisons, alternatives, and guides to help teams choose tools with confidence.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DailyTechInsights | SaaS Reviews & Guides",
    description: "Practical software reviews, comparisons, alternatives, and business technology guides.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": siteUrl + "/#organization",
  name: "DailyTechInsights",
  url: siteUrl + "/",
  description: "Practical SaaS reviews, software comparisons, alternatives, and business technology guides.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": siteUrl + "/#website",
  name: "DailyTechInsights",
  url: siteUrl + "/",
  publisher: { "@id": siteUrl + "/#organization" },
  inLanguage: "en",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
    {children}
  </body></html>;
}
