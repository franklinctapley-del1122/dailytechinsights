import Link from "next/link";

const links = [
  ["Reviews", "/reviews/"],
  ["Comparisons", "/comparisons/"],
  ["Alternatives", "/alternatives/"],
  ["Best Software", "/best/"],
  ["Guides", "/guides/"],
  ["Categories", "/categories/"],
  ["About", "/about/"],
  ["How We Review", "/how-we-review/"],
  ["Editorial Policy", "/editorial-policy/"],
  ["Contact", "/contact/"],
  ["Privacy", "/privacy-policy/"],
  ["Terms", "/terms/"],
  ["Affiliate Disclosure", "/affiliate-disclosure/"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <Link href="/" className="brand brand--footer">Daily<span>Tech</span>Insights</Link>
          <p>Independent SaaS research, reviews, comparisons and practical software insights.</p>
        </div>
        <nav aria-label="Footer navigation" className="footer-links">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <small>© {new Date().getFullYear()} DailyTechInsights. Research to help teams choose software with confidence.</small>
      </div>
    </footer>
  );
}
