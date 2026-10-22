import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dailytechinsights.com"),
  applicationName: "DailyTechInsights",
  authors: [{ name: "DailyTechInsights Editorial Team" }],
  creator: "DailyTechInsights",
  publisher: "DailyTechInsights"
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
