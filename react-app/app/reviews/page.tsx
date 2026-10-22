import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SaaS Reviews",
  description: "Explore detailed SaaS reviews covering features, pricing, usability, integrations, pros and cons, alternatives, and business use cases.",
  alternates: { canonical: "/reviews/" },
  openGraph: { type: "website", url: "/reviews/", title: "SaaS Reviews | DailyTechInsights", description: "Explore detailed SaaS reviews covering features, pricing, usability, integrations, pros and cons, alternatives, and business use cases." },
};

const reviews = [
  { name: "HubSpot Review", category: "CRM & Marketing", href: "/reviews/hubspot-review/", copy: "Review CRM, marketing, sales and customer-service capabilities, pricing considerations and alternatives." },
  { name: "Notion Review", category: "Productivity", href: "/reviews/notion-review/", copy: "Explore Notion’s flexible workspace for notes, documentation, projects and team knowledge." },
  { name: "ClickUp Review", category: "Project Management", href: "/reviews/clickup-review/", copy: "Assess work management features, customisation, collaboration and implementation trade-offs." },
  { name: "Semrush Review", category: "SEO & Marketing", href: "/reviews/semrush-review/", copy: "Understand SEO research, competitive analysis, content tools and plan fit." },
  { name: "Slack Review", category: "Team Communication", href: "/reviews/slack-review/", copy: "Evaluate messaging, integrations, workflow support and communication needs." },
  { name: "Pipedrive Review", category: "Sales CRM", href: "/reviews/pipedrive-review/", copy: "Review sales pipeline management, usability, automation and CRM fit." },
  { name: "Canva Review", category: "Design & Content", href: "/reviews/canva-review/", copy: "Explore design workflows, collaboration and content creation capabilities." },
  { name: "Salesforce Review", category: "CRM & Sales", href: "/reviews/salesforce-review/", copy: "Assess Sales Cloud features, published pricing, implementation trade-offs and alternatives." },
];

export default function ReviewsPage() {
  return <>
    <section className="page-hero"><div className="container">
      <p className="eyebrow">Software research library</p>
      <h1>SaaS Reviews</h1>
      <p>Explore software reviews covering features, pricing, usability, integrations, strengths, limitations, alternatives and business use cases. Use the same decision criteria to compare tools against your team’s needs.</p>
    </div></section>
    <section className="section"><div className="container">
      <div className="section-heading"><h2>Featured SaaS reviews</h2><p>Start with a tool below, then compare its fit with your workflow, team size and budget.</p></div>
      <div className="card-grid">{reviews.map((review) => <article className="content-card" key={review.href}>
        <span className="card-kicker">{review.category}</span><h3>{review.name}</h3><p>{review.copy}</p><Link className="text-link" href={review.href}>Read review →</Link>
      </article>)}</div>
    </div></section>
  </>;
}
