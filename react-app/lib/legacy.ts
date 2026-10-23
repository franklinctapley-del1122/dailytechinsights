import pageSources from "@/legacy/pages.json";

export type PageId = string;
export type LegacyPageData = {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  styles: string;
  body: string;
  jsonLd: string[];
};

const sourceMap = pageSources as Record<string, string>;
const routeIds = Object.keys(sourceMap);

export function getRouteIds(): string[] {
  return routeIds;
}

function firstMatch(source: string, pattern: RegExp, fallback = ""): string {
  return pattern.exec(source)?.[1]?.trim() ?? fallback;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

export function resolvePageId(slug?: string[]): PageId | undefined {
  const key = (slug ?? []).join("/");
  const id = key || "home";
  return Object.prototype.hasOwnProperty.call(sourceMap, id) ? id : undefined;
}

export function getLegacyPage(id: PageId): LegacyPageData {
  const source = sourceMap[id] ?? "";
  const head = firstMatch(source, /<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const body = firstMatch(source, /<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const title = decodeEntities(firstMatch(head, /<title[^>]*>([\s\S]*?)<\/title>/i, "DailyTechInsights"));
  const description = decodeEntities(firstMatch(head, /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i,
    firstMatch(head, /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i, "")));
  const canonicalFallback = id === "home" ? "https://www.dailytechinsights.com/" : "https://www.dailytechinsights.com/" + id + "/";
  const canonical = firstMatch(head, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i, canonicalFallback);
  const robots = firstMatch(head, /<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i, "index,follow");
  const styles = [...head.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join("\n");
  const jsonLd = [...source.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean);
  const cleanBody = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  return { title, description, canonical, robots, styles, body: cleanBody, jsonLd };
}

export function getLegacyMetadata(id: PageId) {
  const page = getLegacyPage(id);
  const previewNoindex = process.env.DTI_PREVIEW_NOINDEX === "true" || process.env.VERCEL_ENV === "preview";
  const index = !previewNoindex && !/noindex/i.test(page.robots);
  const follow = !previewNoindex && !/nofollow/i.test(page.robots);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.canonical },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
        "max-image-preview": /max-image-preview:large/i.test(page.robots) ? "large" as const : undefined,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.canonical,
      siteName: "DailyTechInsights",
      type: "website" as const,
    },
  };
}
