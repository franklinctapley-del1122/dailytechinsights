import Link from "next/link";

const links = [
  ["Reviews", "/reviews/"],
  ["Categories", "/categories/"],
  ["Comparisons", "/comparisons/"],
  ["Alternatives", "/alternatives/"],
  ["Best Software", "/best/"],
  ["Guides", "/guides/"]
] as const;

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="siteHeaderInner">
        <Link className="brand" href="/" aria-label="DailyTechInsights home">
          Daily<span>Tech</span>Insights
        </Link>
        <nav className="mainNav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
