import Link from "next/link";

const mainLinks = [
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
  ["Privacy Policy", "/privacy-policy/"],
  ["Terms", "/terms/"],
  ["Affiliate Disclosure", "/affiliate-disclosure/"],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer-react">
      <div className="site-footer-react__inner">
        <div className="site-footer-react__top">
          <div className="site-footer-react__intro">
            <Link className="site-footer-react__brand" href="/">Daily<span>Tech</span>Insights</Link>
            <p>Independent SaaS research, reviews, comparisons and practical software insights.</p>
          </div>
          <nav className="site-footer-react__links" aria-label="Footer navigation">
            {mainLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
        </div>
        <div className="site-footer-react__bottom">
          <span>© {new Date().getFullYear()} DailyTechInsights. All rights reserved.</span>
          <span>Research before you choose.</span>
        </div>
      </div>
    </footer>
  );
}
