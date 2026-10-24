import type { Metadata } from "next";
import FreeToolClient from "@/components/FreeToolClient";
export const metadata: Metadata = { title: "Reading Time Calculator: Estimate Article Read Time | DailyTechInsights", description: "Calculate estimated reading time from a word count or pasted text. Choose a reading speed for blog posts, reports, and articles.", alternates: { canonical: "https://www.dailytechinsights.com/tools/reading-time-calculator/" }, robots: { index: true, follow: true } };
export default function ReadingTimePage(){ return <FreeToolClient tool="reading" />; }
