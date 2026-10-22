import { readFileSync } from "node:fs";
import path from "node:path";
import pageSources from "@/legacy/pages.json";
export type PageId = "home" | "reviews" | "salesforceReview" | "projectManagementGuide";
export type LegacyPageData = { title:string; description:string; canonical:string; robots:string; styles:string; body:string; jsonLd:string[] };
const sourceMap = pageSources as Record<PageId,string>;
function firstMatch(source:string, pattern:RegExp, fallback=""):string { return pattern.exec(source)?.[1]?.trim() ?? fallback; }
export function resolvePageId(slug?:string[]):PageId|undefined { const key=(slug??[]).join("/"); const routes:Record<string,PageId>={"":"home","reviews":"reviews","reviews/salesforce-review":"salesforceReview","guides/project-management-vs-task-management":"projectManagementGuide"}; return routes[key]; }
export function getLegacyPage(id:PageId):LegacyPageData {
 const source=sourceMap[id];
 const head=firstMatch(source,/<head\\b[^>]*>([\\s\\S]*?)<\\/head>/i);
 const body=firstMatch(source,/<body\\b[^>]*>([\\s\\S]*?)<\\/body>/i);
 const title=firstMatch(head,/<title[^>]*>([\\s\\S]*?)<\\/title>/i,"DailyTechInsights");
 const description=firstMatch(head,/<meta\\s+name=["']description["']\\s+content=["']([^"']*)["'][^>]*>/i);
 const canonical=firstMatch(head,/<link\\s+rel=["']canonical["']\\s+href=["']([^"']+)["'][^>]*>/i,"https://www.dailytechinsights.com/");
 const robots=firstMatch(head,/<meta\\s+name=["']robots["']\\s+content=["']([^"']*)["'][^>]*>/i,"index,follow");
 const styles=[...head.matchAll(/<style\\b[^>]*>([\\s\\S]*?)<\\/style>/gi)].map(m=>m[1]).join("\\n");
 const jsonLd=[...source.matchAll(/<script\\s+type=["']application\\/ld\\+json["'][^>]*>([\\s\\S]*?)<\\/script>/gi)].map(m=>m[1].trim()).filter(Boolean);
 const cleanBody=body.replace(/<script\\b[^>]*>[\\s\\S]*?<\\/script>/gi,"");
 return {title,description,canonical,robots,styles,body:cleanBody,jsonLd};
}
export function getLegacyMetadata(id:PageId) {
 const page=getLegacyPage(id); const previewNoindex=process.env.DTI_PREVIEW_NOINDEX==="true"; const index=!previewNoindex&&!/noindex/i.test(page.robots); const follow=!previewNoindex&&!/nofollow/i.test(page.robots);
 return {title:page.title,description:page.description,alternates:{canonical:page.canonical},robots:{index,follow,googleBot:{index,follow,"max-image-preview":/max-image-preview:large/i.test(page.robots)?"large" as const:undefined}},openGraph:{title:page.title,description:page.description,url:page.canonical,siteName:"DailyTechInsights",type:"website" as const}};
}
