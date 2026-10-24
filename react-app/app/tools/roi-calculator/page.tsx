import type { Metadata } from "next";
import FreeToolClient from "@/components/FreeToolClient";
export const metadata: Metadata = { title: "SaaS ROI Calculator: Estimate Software Return on Investment | DailyTechInsights", description: "Estimate annual labor value, software cost, net benefit and ROI using your own assumptions with this free SaaS ROI calculator.", alternates: { canonical: "https://www.dailytechinsights.com/tools/roi-calculator/" }, robots: { index: true, follow: true } };
export default function RoiCalculatorPage(){ return <FreeToolClient tool="roi" />; }
