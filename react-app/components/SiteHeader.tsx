import Link from "next/link";

const links = [
  { label: "Reviews", href: "/reviews/" },
  { label: "Categories", href: "/categories/" },
  { label: "Comparisons", href: "/comparisons/" },
  { label: "Alternatives", href: "/alternatives/" },
  { label: "Best Software", href: "/best/" },
  { label: "Guides", href: "/guides/" },
  { label: "Free Tools", href: "/tools/" },
];

export default function SiteHeader() {
  return (
    <header className="site-header-react">
      <div className="site-header-react__inner">
        <Link href="/" className="site-header-react__brand" aria-label="DailyTechInsights home">
          <span className="site-header-react__mark">d</span>
          <span>DailyTech<span className="site-header-react__accent">Insights</span></span>
        </Link>
        <nav className="site-header-react__nav" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <Link className="site-header-react__cta" href="/tools/">Free tools <span aria-hidden="true">↗</span></Link>
      </div>
    </header>
  );
}
