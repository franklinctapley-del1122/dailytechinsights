import Link from "next/link";

const links = [
  ["Reviews", "/reviews/"], ["Comparisons", "/comparisons/"],
  ["Alternatives", "/alternatives/"], ["Best Software", "/best/"],
  ["Guides", "/guides/"], ["Categories", "/categories/"],
  ["About", "/about/"], ["How We Review", "/how-we-review/"],
  ["Editorial Policy", "/editorial-policy/"], ["Contact", "/contact/"],
  ["Privacy", "/privacy-policy/"], ["Terms", "/terms/"],
  ["Affiliate Disclosure", "/affiliate-disclosure/"]
] as const;

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <Link className="footerBrand" href="/">Daily<span>Tech</span>Insights</Link>
        <p>Independent SaaS research, reviews, comparisons and practical software insights.</p>
        <nav className="footerLinks" aria-label="Footer navigation">
          {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>
        <small>© 2026 DailyTechInsights. All rights reserved.</small>
      </div>
    </footer>
  );
}
