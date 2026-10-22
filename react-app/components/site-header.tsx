import Link from "next/link";

const links = [
  ["Reviews", "/reviews/"],
  ["Categories", "/categories/"],
  ["Comparisons", "/comparisons/"],
  ["Alternatives", "/alternatives/"],
  ["Best Software", "/best/"],
  ["Guides", "/guides/"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="DailyTechInsights home">
          Daily<span>Tech</span>Insights
        </Link>
        <nav aria-label="Primary navigation" className="site-nav">
          {links.map(([label, href]) => (
            <Link href={href} key={href}>{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
