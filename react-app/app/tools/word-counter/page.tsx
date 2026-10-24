import type { Metadata } from "next";
import FreeToolClient from "@/components/FreeToolClient";
export const metadata: Metadata = { title: "Free Word Counter: Words, Characters & Sentences | DailyTechInsights", description: "Count words, characters, sentences and paragraphs instantly with this free online word counter. Estimate reading time in your browser.", alternates: { canonical: "https://www.dailytechinsights.com/tools/word-counter/" }, robots: { index: true, follow: true } };
export default function WordCounterPage(){ return <FreeToolClient tool="word" />; }
