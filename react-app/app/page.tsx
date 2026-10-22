import Link from "next/link";

const pathways = [
  { label: "Software Reviews", title: "Know what you’re buying", copy: "Explore software features, pricing, strengths, limitations and the teams each tool suits best.", href: "/reviews/" },
  { label: "Comparisons", title: "Compare your shortlist", copy: "Understand the practical differences between popular tools before committing to a platform.", href: "/comparisons/" },
  { label: "Alternatives", title: "Find a better fit", copy: "Compare alternatives when your current software no longer fits your needs or budget.", href: "/alternatives/" },
  { label: "Buying Guides", title: "Choose with confidence", copy: "Use practical checklists and decision frameworks to evaluate software for your business.", href: "/guides/" },
  { label: "Categories", title: "Explore by workflow", copy: "Discover tools for CRM, marketing, project management, productivity and more.", href: "/categories/" },
  { label: "Best Software", title: "Start with the shortlist", copy: "Review curated software options and the criteria that matter when selecting a tool.", href: "/best/" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div>
            <p className="eyebrow">Independent SaaS research</p>
            <h1>Make Better Software Decisions with DailyTechInsights</h1>
            <p className="hero__copy">Clear software reviews, practical comparisons and useful buying guides to help you choose tools that fit your team, workflow and budget.</p>
            <div className="actions">
              <Link className="button" href="/reviews/">Explore software reviews</Link>
              <Link className="button button--secondary" href="/guides/">Read buying guides</Link>
            </div>
          </div>
          <aside className="hero-card" aria-label="How DailyTechInsights helps">
            <div className="hero-card__label">A clearer path to a decision</div>
            <div className="hero-card__item"><div className="check">1</div><div><strong>Understand the tool</strong><span>Features, pricing and practical use cases</span></div></div>
            <div className="hero-card__item"><div className="check">2</div><div><strong>Compare the trade-offs</strong><span>Strengths, limitations and alternatives</span></div></div>
            <div className="hero-card__item"><div className="check">3</div><div><strong>Choose your fit</strong><span>Decision criteria for your team and budget</span></div></div>
          </aside>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Explore DailyTechInsights</p>
            <h2>Find the right software for the work you do</h2>
            <p>Move from a long list of tools to a more confident shortlist with focused research and actionable guidance.</p>
          </div>
          <div className="card-grid">
            {pathways.map((item) => <article className="content-card" key={item.href}>
              <span className="card-kicker">{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <Link className="text-link" href={item.href}>Explore {item.label.toLowerCase()} →</Link>
            </article>)}
          </div>
          <div className="trust-strip">
            <div className="trust-item"><strong>Practical criteria</strong><span>Focus on features, value and real business needs.</span></div>
            <div className="trust-item"><strong>Clear trade-offs</strong><span>Understand limitations as well as benefits.</span></div>
            <div className="trust-item"><strong>Research-led guidance</strong><span>Use structured information to narrow your options.</span></div>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Start here</p>
            <h2>Research before you commit</h2>
            <p>Explore the existing review library and practical guides while the React version is being migrated and checked page by page.</p>
          </div>
          <div className="actions">
            <Link className="button" href="/reviews/">Browse all reviews</Link>
            <Link className="button button--secondary" href="/guides/project-management-vs-task-management/">Project vs. task management</Link>
          </div>
        </div>
      </section>
    </>
  );
}
