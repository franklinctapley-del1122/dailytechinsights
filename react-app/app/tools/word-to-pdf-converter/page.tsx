import type { Metadata } from "next";
import WordToPdfClient from "@/components/WordToPdfClient";

export const metadata: Metadata = {
  title: "Free Word to PDF Converter Online | DailyTechInsights",
  description: "Convert Word DOCX documents to PDF online for free. Download your converted document directly from your browser without uploading it to DailyTechInsights.",
  alternates: { canonical: "https://www.dailytechinsights.com/tools/word-to-pdf-converter/" },
  robots: { index: true, follow: true },
};

export default function WordToPdfConverterPage() {
  return <WordToPdfClient />;
}
