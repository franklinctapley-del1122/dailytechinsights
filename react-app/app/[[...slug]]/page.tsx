import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacyPage from "@/components/LegacyPage";
import { getLegacyMetadata, resolvePageId } from "@/lib/legacy";
export function generateStaticParams() { return [{slug:[]},{slug:["reviews"]},{slug:["reviews","salesforce-review"]},{slug:["guides","project-management-vs-task-management"]}]; }
type Props={params:Promise<{slug?:string[]}>};
export async function generateMetadata({params}:Props):Promise<Metadata> { const {slug}=await params; const id=resolvePageId(slug); return id?getLegacyMetadata(id):{title:"Page not found | DailyTechInsights",robots:{index:false,follow:false}}; }
export default async function PilotRoute({params}:Props) { const {slug}=await params; const id=resolvePageId(slug); if(!id) notFound(); return <LegacyPage id={id}/>; }
