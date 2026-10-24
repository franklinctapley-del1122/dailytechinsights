import type { Metadata } from "next";
import FreeToolClient from "@/components/FreeToolClient";
export const metadata: Metadata = { title: "Free Online Tools for SEO, Content & Business | DailyTechInsights", description: "Free browser-based tools from DailyTechInsights: word counter, reading time calculator, and SaaS ROI calculator for content creators, marketers, and businesses.", alternates: { canonical: "https://www.dailytechinsights.com/tools/" }, robots: { index: true, follow: true } };
export default function ToolsPage(){ return <FreeToolClient tool="directory" />; }
