import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dailytechinsights.com"),
  title: "DailyTechInsights — SaaS Reviews & Comparisons",
  description: "Independent SaaS reviews, software comparisons, alternatives, best software guides, and practical technology insights.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
