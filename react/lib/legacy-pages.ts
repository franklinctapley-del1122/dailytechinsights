import fs from "node:fs";
import path from "node:path";
import { load } from "cheerio";
import type { Metadata } from "next";

const repoRoot = path.resolve(process.cwd(), "..");
const excludedDirectories = new Set([
  ".git", "node_modules", ".next", "out", "react", "components", "docs", "assets", "images", "fonts"
]);

export type LegacyPage = {
  sourcePath: string;
  route: string[];
  title: string;
  description: string;
  canonical: string;
  robots: string;
  bodyHtml: string;
  styles: string[];
  structuredData: string[];
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
};

function walk(directory: string, relative = ""): string[] {
  const result: string[] = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!excludedDirectories.has(entry.name)) {
        result.push(...walk(path.join(directory, entry.name), path.join(relative, entry.name)));
      }
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase() === "index.html") {
      result.push(path.join(relative, entry.name));
    }
  }
  return result;
}

function routeForSource(source: string): string[] {
  const parent = path.dirname(source);
  return parent === "." ? [] : parent.split(path.sep).filter(Boolean);
}

export function getAllLegacyRoutes(): { slug: string[] }[] {
  return walk(repoRoot)
    .map((source) => routeForSource(source))
    .sort((a, b) => a.join("/").localeCompare(b.join("/")))
    .map((slug) => ({ slug }));
}

function sourceForRoute(slug: string[]): string {
  return path.join(repoRoot, ...(slug.length ? slug : []), "index.html");
}

export function getLegacyPage(slug: string[] = []): LegacyPage | null {
  const sourcePath = sourceForRoute(slug);
  if (!fs.existsSync(sourcePath)) return null;

  const raw = fs.readFileSync(sourcePath, "utf8");
  const $ = load(raw);
  const title = $("title").first().text().trim() || "DailyTechInsights";
  const description = $('meta[name="description"]').attr("content")?.trim() || "";
  const canonical = $('link[rel="canonical"]').attr("href") || `https://www.dailytechinsights.com/${slug.length ? slug.join("/") + "/" : ""}`;
  const robots = $('meta[name="robots"]').attr("content") || "index,follow";
  const styles = $("head style").toArray().map((node) => $(node).html() || "").filter(Boolean);
  const structuredData = $('head script[type="application/ld+json"]').toArray()
    .map((node) => $(node).html() || "").filter(Boolean);

  const body = $("body");
  body.find("[data-shared-header], [data-shared-footer]").remove();
  body.find("script[type='application/ld+json']").remove();

  return {
    sourcePath,
    route: slug,
    title,
    description,
    canonical,
    robots,
    bodyHtml: body.html() || "",
    styles,
    structuredData,
    openGraphTitle: $('meta[property="og:title"]').attr("content"),
    openGraphDescription: $('meta[property="og:description"]').attr("content"),
    twitterTitle: $('meta[name="twitter:title"]').attr("content"),
    twitterDescription: $('meta[name="twitter:description"]').attr("content")
  };
}

export function legacyMetadata(page: LegacyPage): Metadata {
  return {
    title: page.title,
    description: page.description || undefined,
    alternates: { canonical: page.canonical },
    robots: page.robots,
    openGraph: {
      type: "website",
      siteName: "DailyTechInsights",
      title: page.openGraphTitle || page.title,
      description: page.openGraphDescription || page.description,
      url: page.canonical
    },
    twitter: {
      card: "summary",
      title: page.twitterTitle || page.title,
      description: page.twitterDescription || page.description
    }
  };
}
