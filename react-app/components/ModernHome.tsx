"use client";

const categories = [
  { icon: "✦", title: "AI & Automation", detail: "Find tools that reduce repetitive work and connect your workflows.", href: "/reviews/" },
  { icon: "↗", title: "Marketing & SEO", detail: "Research, optimize campaigns, and grow organic visibility.", href: "/reviews/" },
  { icon: "◎", title: "CRM & Sales", detail: "Organize leads, customer relationships, and sales pipelines.", href: "/reviews/salesforce-review/" },
  { icon: "▦", title: "Productivity", detail: "Plan work and make everyday collaboration simpler.", href: "/guides/project-management-vs-task-management/" },
  { icon: "⌘", title: "Project Management", detail: "Compare ways to coordinate projects, tasks, and teams.", href: "/guides/project-management-vs-task-management/" },
  { icon: "◇", title: "Business Operations", detail: "Explore software for the systems behind your business.", href: "/reviews/" },
];

export default function ModernHome() {
  return (
    <main className="modern-home">
      <header className="modern-header">
        <a className="modern-brand" href="/" aria-label="DailyTechInsights home">
          <span className="brand-mark">d</span><span>DailyTech<span className="brand-accent">Insights</span></span>
        </a>
        <nav className="modern-nav" aria-label="Main navigation">
          <a href="/reviews/">Reviews</a>
          <a href="/guides/project-management-vs-task-management/">Guides</a>
          <a href="#categories">Categories</a>
        </nav>
        <a className="header-cta" href="/reviews/">Explore software <span aria-hidden="true">↗</span></a>
      </header>

      <section className="modern-hero">
        <div className="hero-glow hero-glow-one" aria-hidden="true" />
        <div className="hero-glow hero-glow-two" aria-hidden="true" />
        <div className="hero-inner">
          <div className="eyebrow"><span className="eyebrow-dot" /> CLARITY FOR YOUR NEXT SOFTWARE DECISION</div>
          <h1>Choose software with <span>confidence.</span></h1>
          <p className="hero-copy">Independent SaaS reviews, practical guides, and clear comparisons to help you find the right tools for the way you work.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/reviews/">Explore software reviews <span aria-hidden="true">→</span></a>
            <a className="button button-secondary" href="/guides/project-management-vs-task-management/">Read practical guides</a>
          </div>
          <div className="hero-proof"><span className="proof-icon">✓</span> Practical research <span className="proof-separator">·</span> Clear comparisons <span className="proof-separator">·</span> Business-focused advice</div>
          <div className="product-window" aria-label="A preview of software research topics">
            <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span>DAILYTECHINSIGHTS / DISCOVER</span><span className="window-status"><b /> Research library</span></div>
            <div className="window-body">
              <div className="window-sidebar"><div className="sidebar-logo">d.</div><span className="sidebar-active">▦</span><span>⌕</span><span>◇</span><span>↗</span></div>
              <div className="window-content">
                <div className="window-kicker">YOUR SOFTWARE SHORTLIST</div>
                <div className="window-title">Find the right tool for the job.</div>
                <div className="window-subtitle">Start with a workflow, then compare the options.</div>
                <div className="window-cards">
                  <a href="/reviews/salesforce-review/" className="window-card"><span className="mini-icon mini-blue">S</span><span><b>CRM & sales</b><small>Review the platform</small></span><span className="card-arrow">↗</span></a>
                  <a href="/guides/project-management-vs-task-management/" className="window-card"><span className="mini-icon mini-violet">↗</span><span><b>Project planning</b><small>Understand your options</small></span><span className="card-arrow">↗</span></a>
                  <a href="/reviews/" className="window-card"><span className="mini-icon mini-green">✳</span><span><b>Software reviews</b><small>Explore the library</small></span><span className="card-arrow">↗</span></a>
                </div>
              </div>
              <div className="window-aside"><div className="aside-label">A BETTER WAY TO CHOOSE</div><div className="aside-line aside-line-wide" /><div className="aside-line" /><div className="aside-check"><span>✓</span> Understand the fit</div><div className="aside-check"><span>✓</span> Compare key features</div><div className="aside-check"><span>✓</span> Make an informed choice</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="modern-section categories-section" id="categories">
        <div className="section-heading">
          <div><div className="section-eyebrow">EXPLORE BY WORKFLOW</div><h2>Software for the work you do.</h2></div>
          <p>Start with the challenge you want to solve. Explore reviews and guides designed to make the options easier to understand.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => <a className="category-card" href={category.href} key={category.title}><span className="category-icon">{category.icon}</span><span className="category-card-title">{category.title}<span className="category-arrow">↗</span></span><span className="category-detail">{category.detail}</span></a>)}
        </div>
      </section>

      <section className="modern-section featured-section">
        <div className="section-heading">
          <div><div className="section-eyebrow">START YOUR RESEARCH</div><h2>Make your next decision clearer.</h2></div>
          <p>Get to the useful details faster with focused reviews and practical explainers.</p>
        </div>
        <div className="featured-grid">
          <a className="featured-card featured-review" href="/reviews/salesforce-review/">
            <div className="featured-topline"><span className="featured-label">SOFTWARE REVIEW</span><span className="featured-symbol">↗</span></div>
            <div className="featured-art salesforce-art"><span className="salesforce-cloud">S</span><span className="art-orbit orbit-one" /><span className="art-orbit orbit-two" /></div>
            <div className="featured-copy"><h3>Salesforce Review</h3><p>Explore a major CRM platform and evaluate whether its capabilities fit your business needs.</p><span className="text-link">Read the review <span>→</span></span></div>
          </a>
          <a className="featured-card featured-guide" href="/guides/project-management-vs-task-management/">
            <div className="featured-topline"><span className="featured-label">PRACTICAL GUIDE</span><span className="featured-symbol">↗</span></div>
            <div className="featured-art guide-art"><div className="guide-board"><span /><span /><span /><i /><i /><i /></div><div className="guide-check">✓</div></div>
            <div className="featured-copy"><h3>Project Management vs. Task Management</h3><p>Understand the difference and decide which approach fits the work your team needs to do.</p><span className="text-link">Read the guide <span>→</span></span></div>
          </a>
        </div>
      </section>

      <section className="modern-bottom-cta">
        <div><div className="section-eyebrow">BETTER TOOLS. BETTER WORKFLOWS.</div><h2>Make your software shortlist with confidence.</h2><p>Start with reviews and guides built around real business decisions.</p></div>
        <a className="button button-light" href="/reviews/">Explore the library <span aria-hidden="true">→</span></a>
      </section>

      <footer className="modern-footer"><a className="modern-brand footer-brand" href="/"><span className="brand-mark">d</span><span>DailyTech<span className="brand-accent">Insights</span></span></a><p>Practical SaaS research for smarter business decisions.</p><div><a href="/reviews/">Reviews</a><a href="/guides/project-management-vs-task-management/">Guides</a><a href="#categories">Categories</a></div><small>© {new Date().getFullYear()} DailyTechInsights. Research before you choose.</small></footer>
    </main>
  );
}
