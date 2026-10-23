import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

type HubCard = { title: string; category: string; description: string; href: string; cta: string; icon: string; tone: string };
type HubConfig = { eyebrow: string; title: string; accent: string; description: string; icon: string; intro: string; cardsTitle: string; cards: HubCard[]; topicsTitle: string; topics: { label: string; href: string }[]; relatedTitle: string; related: { title: string; description: string; href: string }[] };

const sharedTopics = [
  { label: "CRM software", href: "/categories/" },
  { label: "Marketing tools", href: "/categories/" },
  { label: "Project management", href: "/guides/project-management-vs-task-management/" },
  { label: "Productivity software", href: "/categories/" },
  { label: "Salesforce review", href: "/reviews/salesforce-review/" },
  { label: "Software reviews", href: "/reviews/" },
];

const configs: Record<string, HubConfig> = {
  reviews: {
    eyebrow: "SAAS REVIEWS", title: "In-Depth SaaS", accent: "Reviews", icon: "✦",
    description: "Honest, practical software reviews to help you choose tools that fit your team, workflow, and budget.",
    intro: "Explore what software does well, where it may fall short, and which teams are most likely to benefit before you commit.",
    cardsTitle: "Featured software reviews",
    cards: [
      { title: "Salesforce Review", category: "CRM & sales", description: "Evaluate CRM capabilities, sales workflows, and whether the platform fits your business.", href: "/reviews/salesforce-review/", cta: "Read Salesforce review", icon: "S", tone: "blue" },
      { title: "HubSpot Review", category: "Marketing & CRM", description: "Explore marketing, customer relationship, and automation tools for growing teams.", href: "/reviews/hubspot-review/", cta: "Read HubSpot review", icon: "H", tone: "orange" },
      { title: "Notion Review", category: "Productivity", description: "Assess a flexible workspace for notes, documentation, knowledge, and team workflows.", href: "/reviews/notion-review/", cta: "Read Notion review", icon: "N", tone: "dark" },
      { title: "ClickUp Review", category: "Project management", description: "Explore task planning, project visibility, and collaboration features for teams.", href: "/reviews/clickup-review/", cta: "Read ClickUp review", icon: "C", tone: "violet" },
      { title: "Canva Review", category: "Design & content", description: "Explore design tools for visual content, presentations, and marketing materials.", href: "/reviews/canva-review/", cta: "Read Canva review", icon: "C", tone: "blue" },
      { title: "Semrush Review", category: "SEO & marketing", description: "Review SEO and digital marketing capabilities for keyword and competitor research.", href: "/reviews/semrush-review/", cta: "Read Semrush review", icon: "S", tone: "orange" },
      { title: "Slack Review", category: "Team communication", description: "Consider messaging and collaboration workflows for teams and organizations.", href: "/reviews/slack-review/", cta: "Read Slack review", icon: "#", tone: "green" },
      { title: "Pipedrive Review", category: "CRM & sales", description: "Explore sales pipeline management and tools for organizing deals and follow-ups.", href: "/reviews/pipedrive-review/", cta: "Read Pipedrive review", icon: "P", tone: "violet" },
    ],
    topicsTitle: "Browse review topics", topics: sharedTopics,
    relatedTitle: "Continue your software research",
    related: [
      { title: "Compare software side by side", description: "Focus on the differences that matter for your use case.", href: "/comparisons/" },
      { title: "Find alternatives", description: "Explore other options when a tool is not the right fit.", href: "/alternatives/" },
      { title: "Understand your options", description: "Use practical guides to make a more informed shortlist.", href: "/guides/" },
    ],
  },
  categories: {
    eyebrow: "SOFTWARE CATEGORIES", title: "Explore Software by", accent: "Category", icon: "▦",
    description: "Find tools by the job you need to do, from customer relationships and marketing to project planning and productivity.",
    intro: "Start with your business need, then follow the links to relevant reviews, comparisons, alternatives, and practical guides.",
    cardsTitle: "Popular software categories",
    cards: [
      { title: "CRM & Sales", category: "Customer relationships", description: "Organize contacts, manage pipelines, and support sales teams.", href: "/reviews/salesforce-review/", cta: "Explore CRM review", icon: "◎", tone: "blue" },
      { title: "Marketing", category: "Campaigns & growth", description: "Explore email, automation, SEO, and campaign workflow tools.", href: "/reviews/hubspot-review/", cta: "Explore marketing tools", icon: "↗", tone: "orange" },
      { title: "Project Management", category: "Planning & delivery", description: "Coordinate projects, track tasks, and keep teams aligned.", href: "/guides/project-management-vs-task-management/", cta: "Read project guide", icon: "▦", tone: "violet" },
      { title: "Productivity", category: "Focus & collaboration", description: "Build better workflows for notes, documents, and everyday work.", href: "/reviews/notion-review/", cta: "Explore productivity", icon: "✳", tone: "green" },
    ],
    topicsTitle: "Explore related topics", topics: sharedTopics,
    relatedTitle: "Choose your next step",
    related: [
      { title: "Read detailed reviews", description: "Learn about features, fit, strengths, and trade-offs.", href: "/reviews/" },
      { title: "Compare your shortlist", description: "Compare options before narrowing your choices.", href: "/comparisons/" },
      { title: "Find tools for a specific need", description: "Browse curated software lists by use case.", href: "/best/" },
    ],
  },
  comparisons: {
    eyebrow: "SOFTWARE COMPARISONS", title: "Compare Tools. Choose", accent: "Confidently.", icon: "⇄",
    description: "Side-by-side software comparisons that help you understand features, trade-offs, and the best fit for your work.",
    intro: "A useful comparison goes beyond feature lists. Consider your workflow, team size, integrations, learning curve, and total cost.",
    cardsTitle: "Popular comparisons",
    cards: [
      { title: "Salesforce vs HubSpot", category: "CRM & marketing", description: "Compare CRM and marketing needs, then review each platform's strengths and trade-offs.", href: "/reviews/salesforce-review/", cta: "Read Salesforce review", icon: "⇄", tone: "blue" },
      { title: "Project vs Task Management", category: "Planning & workflow", description: "Understand when you need project-level planning versus day-to-day task tracking.", href: "/guides/project-management-vs-task-management/", cta: "Read the comparison guide", icon: "▦", tone: "violet" },
      { title: "Notion vs ClickUp", category: "Productivity & projects", description: "Explore workspace and project-management approaches to see which workflow suits your team.", href: "/reviews/notion-review/", cta: "Start with Notion review", icon: "N", tone: "dark" },
      { title: "HubSpot vs Pipedrive", category: "CRM & sales", description: "Consider broader marketing and CRM workflows versus a sales-pipeline-focused approach.", href: "/reviews/hubspot-review/", cta: "Read HubSpot review", icon: "H", tone: "orange" },
      { title: "Semrush vs general SEO tools", category: "SEO & marketing", description: "Learn about SEO research and marketing features before deciding what your team needs.", href: "/reviews/semrush-review/", cta: "Read Semrush review", icon: "S", tone: "orange" },
      { title: "Slack vs workspace tools", category: "Team collaboration", description: "Compare team messaging needs with broader documentation and knowledge workflows.", href: "/reviews/slack-review/", cta: "Read Slack review", icon: "#", tone: "green" },
      { title: "Canva vs dedicated design workflows", category: "Design & content", description: "Assess visual-content creation needs, collaboration, and the kinds of assets you produce.", href: "/reviews/canva-review/", cta: "Read Canva review", icon: "C", tone: "blue" },
      { title: "Compare software with confidence", category: "Decision framework", description: "Use a consistent checklist for features, integrations, usability, pricing, and team fit.", href: "/guides/how-to-compare-software/", cta: "Read how to compare software", icon: "✓", tone: "green" },
    ],
    topicsTitle: "Related research", topics: sharedTopics,
    relatedTitle: "Make a better-informed decision",
    related: [
      { title: "Read individual reviews", description: "Understand each product before comparing the details.", href: "/reviews/" },
      { title: "Explore alternatives", description: "Look beyond the most familiar options.", href: "/alternatives/" },
      { title: "Use a practical guide", description: "Clarify the workflow you are trying to improve.", href: "/guides/" },
    ],
  },
  alternatives: {
    eyebrow: "SOFTWARE ALTERNATIVES", title: "Find the Best", accent: "Alternatives", icon: "↗",
    description: "Explore alternatives to popular software and discover options that better match your needs, priorities, and budget.",
    intro: "The best alternative depends on what is missing today: pricing flexibility, simpler workflows, specific integrations, or features your team will actually use.",
    cardsTitle: "Explore software alternatives",
    cards: [
      { title: "Salesforce alternatives", category: "CRM", description: "Explore CRM options for different sales processes, customer relationships, and business needs.", href: "/reviews/salesforce-review/", cta: "Review Salesforce first", icon: "S", tone: "blue" },
      { title: "HubSpot alternatives", category: "Marketing & CRM", description: "Consider what your team needs from marketing automation, customer data, and CRM workflows.", href: "/reviews/hubspot-review/", cta: "Explore HubSpot review", icon: "H", tone: "orange" },
      { title: "Notion alternatives", category: "Productivity", description: "Explore different approaches to documentation, knowledge management, and team collaboration.", href: "/reviews/notion-review/", cta: "Explore Notion review", icon: "N", tone: "dark" },
      { title: "ClickUp alternatives", category: "Project management", description: "Consider project planning, task tracking, and collaboration needs before choosing a tool.", href: "/reviews/clickup-review/", cta: "Explore ClickUp review", icon: "C", tone: "violet" },
      { title: "Slack alternatives", category: "Team communication", description: "Think through messaging, channels, integrations, and how your team shares updates.", href: "/reviews/slack-review/", cta: "Explore Slack review", icon: "#", tone: "green" },
      { title: "Semrush alternatives", category: "SEO & marketing", description: "Identify which SEO research, keyword analysis, and marketing features your workflow requires.", href: "/reviews/semrush-review/", cta: "Explore Semrush review", icon: "S", tone: "orange" },
      { title: "Pipedrive alternatives", category: "Sales CRM", description: "Compare sales pipeline requirements, deal tracking, and follow-up workflows before switching.", href: "/reviews/pipedrive-review/", cta: "Explore Pipedrive review", icon: "P", tone: "blue" },
      { title: "Find the right software fit", category: "Decision guide", description: "Use a practical checklist to weigh features, integrations, usability, pricing, and team needs.", href: "/guides/how-to-compare-software/", cta: "Read the comparison guide", icon: "✓", tone: "green" },
    ],
    topicsTitle: "Explore by need", topics: sharedTopics,
    relatedTitle: "Shortlist with confidence",
    related: [
      { title: "Compare your options", description: "See meaningful differences side by side.", href: "/comparisons/" },
      { title: "Read product reviews", description: "Check capabilities and trade-offs before switching.", href: "/reviews/" },
      { title: "Browse curated picks", description: "Find software lists organized around common needs.", href: "/best/" },
    ],
  },
  best: {
    eyebrow: "CURATED SOFTWARE PICKS", title: "Best Software for", accent: "Your Needs", icon: "✦",
    description: "Explore curated software shortlists organized around real workflows, business needs, and the problems you want to solve.",
    intro: "There is no single best tool for every team. Start with your must-have features, budget, existing stack, and how much setup your team can support.",
    cardsTitle: "Start with a common need",
    cards: [
      { title: "Best CRM Software", category: "Sales & relationships", description: "Explore CRM platforms for leads, contacts, sales pipelines, and customer management.", href: "/best/crm-software/", cta: "Explore CRM picks", icon: "◎", tone: "blue" },
      { title: "Best Project Management Software", category: "Planning & delivery", description: "Compare tools for project planning, task tracking, collaboration, and delivery.", href: "/best/project-management-software/", cta: "Explore project tools", icon: "▦", tone: "violet" },
      { title: "Best Productivity Software", category: "Knowledge & workflows", description: "Find tools for organizing information, collaboration, notes, and everyday work.", href: "/best/productivity-software/", cta: "Explore productivity picks", icon: "✳", tone: "green" },
      { title: "Best SEO Software", category: "Search & analytics", description: "Review software for keyword research, rank tracking, backlinks, and technical SEO.", href: "/best/seo-software/", cta: "Explore SEO tools", icon: "⌕", tone: "orange" },
      { title: "Best AI Tools", category: "AI & automation", description: "Start researching AI tools for writing, research, productivity, and automation.", href: "/best/productivity-software/", cta: "Explore AI-related picks", icon: "✦", tone: "dark" },
      { title: "Best Email Marketing Software", category: "Email & campaigns", description: "Explore campaign, segmentation, and marketing automation needs.", href: "/best/crm-software/", cta: "Explore marketing options", icon: "↗", tone: "blue" },
      { title: "Software for Small Businesses", category: "Business operations", description: "Shortlist practical tools based on budget, team size, and everyday operations.", href: "/best/project-management-software/", cta: "Explore business tools", icon: "◇", tone: "green" },
      { title: "Software for Startups", category: "Growing teams", description: "Consider flexible software for teams building and adapting their workflows.", href: "/best/seo-software/", cta: "Explore startup options", icon: "↗", tone: "violet" },
    ],
    topicsTitle: "Browse more software research", topics: sharedTopics,
    relatedTitle: "From shortlist to decision",
    related: [
      { title: "Check in-depth reviews", description: "Validate the fit and understand possible trade-offs.", href: "/reviews/" },
      { title: "Compare leading options", description: "Focus on the features and workflows that matter most.", href: "/comparisons/" },
      { title: "Find alternatives", description: "Keep other suitable options on your shortlist.", href: "/alternatives/" },
    ],
  },
  guides: {
    eyebrow: "PRACTICAL SOFTWARE GUIDES", title: "Make Software Easier to", accent: "Understand", icon: "✎",
    description: "Step-by-step explainers and practical how-to guides to help you evaluate tools, improve workflows, and work smarter.",
    intro: "Use these guides to understand the problem first, learn the key concepts, and then explore software reviews and comparisons that fit.",
    cardsTitle: "Popular practical guides",
    cards: [
      { title: "Content Optimization for SEO", category: "SEO", description: "Improve pages so content better serves search intent and readers.", href: "/guides/content-optimization-for-seo/", cta: "Read the guide", icon: "✦", tone: "green" },
      { title: "How to Choose SaaS Software", category: "Software buying", description: "Evaluate needs, features, budget, and fit before choosing a SaaS tool.", href: "/guides/how-to-choose-saas-software/", cta: "Read the guide", icon: "◇", tone: "blue" },
      { title: "How to Compare Software", category: "Software buying", description: "Build a practical shortlist and compare the factors that matter.", href: "/guides/how-to-compare-software/", cta: "Read the guide", icon: "⇄", tone: "violet" },
      { title: "How to Do a Technical SEO Audit", category: "SEO", description: "Review technical issues that can affect crawling, indexing, and performance.", href: "/guides/how-to-do-a-technical-seo-audit/", cta: "Read the guide", icon: "⌕", tone: "orange" },
      { title: "Internal Communication Software", category: "Team collaboration", description: "Understand software options for keeping teams informed and aligned.", href: "/guides/internal-communication-software/", cta: "Read the guide", icon: "◎", tone: "blue" },
      { title: "Keyword Research for SEO", category: "SEO", description: "Find relevant search terms and organize them around audience intent.", href: "/guides/keyword-research-for-seo/", cta: "Read the guide", icon: "⌕", tone: "violet" },
      { title: "Knowledge Management Basics", category: "Productivity", description: "Learn how teams capture, organize, and share useful knowledge.", href: "/guides/knowledge-management-basics/", cta: "Read the guide", icon: "▤", tone: "green" },
      { title: "Link Building for SEO", category: "SEO", description: "Understand link building fundamentals and sustainable practices.", href: "/guides/link-building-for-seo/", cta: "Read the guide", icon: "↗", tone: "orange" },
      { title: "On-Page SEO Explained", category: "SEO", description: "Learn how page content and on-page elements support search visibility.", href: "/guides/on-page-seo-explained/", cta: "Read the guide", icon: "✎", tone: "blue" },
      { title: "Project Management vs. Task Management", category: "Planning & productivity", description: "Learn the difference between managing projects and tracking individual tasks.", href: "/guides/project-management-vs-task-management/", cta: "Read the guide", icon: "▦", tone: "violet" },
      { title: "Rank Tracking for SEO", category: "SEO", description: "Learn what keyword rankings can tell you and how to monitor them.", href: "/guides/rank-tracking-for-seo/", cta: "Read the guide", icon: "↗", tone: "green" },
      { title: "Search Intent for SEO", category: "SEO", description: "Match content to what searchers are trying to find or accomplish.", href: "/guides/search-intent-for-seo/", cta: "Read the guide", icon: "⌕", tone: "orange" },
      { title: "SEO Competitor Analysis", category: "SEO", description: "Research competing pages and identify opportunities for useful content.", href: "/guides/seo-competitor-analysis/", cta: "Read the guide", icon: "⇄", tone: "violet" },
      { title: "SEO Software Features", category: "SEO tools", description: "Understand common SEO platform features and how they support your workflow.", href: "/guides/seo-software-features/", cta: "Read the guide", icon: "◇", tone: "blue" },
      { title: "Technical SEO Explained", category: "SEO", description: "Explore crawling, indexing, site structure, and other technical SEO basics.", href: "/guides/technical-seo-explained/", cta: "Read the guide", icon: "⌘", tone: "green" },
      { title: "What Is CRM Software?", category: "CRM & sales", description: "Learn how CRM systems help organize customer relationships and sales activity.", href: "/guides/what-is-crm-software/", cta: "Read the guide", icon: "◎", tone: "blue" },
      { title: "What Is Marketing Automation?", category: "Marketing", description: "Understand how automation supports repeatable marketing workflows.", href: "/guides/what-is-marketing-automation/", cta: "Read the guide", icon: "↗", tone: "orange" },
      { title: "What Is Productivity Software?", category: "Productivity", description: "Explore tools designed to help people organize work and get tasks done.", href: "/guides/what-is-productivity-software/", cta: "Read the guide", icon: "✳", tone: "green" },
      { title: "What Is Project Management Software?", category: "Project management", description: "Learn how project tools help plan work, track progress, and coordinate teams.", href: "/guides/what-is-project-management-software/", cta: "Read the guide", icon: "▦", tone: "violet" },
      { title: "What Is SaaS Software?", category: "SaaS basics", description: "Understand the software-as-a-service model and its common characteristics.", href: "/guides/what-is-saas-software/", cta: "Read the guide", icon: "◇", tone: "blue" },
      { title: "What Is SEO Software?", category: "SEO tools", description: "Learn what SEO tools do and how they support search optimization work.", href: "/guides/what-is-seo-software/", cta: "Read the guide", icon: "⌕", tone: "orange" },
      { title: "What Is Team Collaboration Software?", category: "Team collaboration", description: "Explore tools that help teams communicate, coordinate, and share work.", href: "/guides/what-is-team-collaboration-software/", cta: "Read the guide", icon: "◎", tone: "green" },
    ],
    topicsTitle: "Explore related resources", topics: sharedTopics,
    relatedTitle: "Keep learning and comparing",
    related: [
      { title: "Browse software categories", description: "Start with the workflow or business need you want to address.", href: "/categories/" },
      { title: "Compare tools", description: "Turn what you have learned into a focused shortlist.", href: "/comparisons/" },
      { title: "Explore curated software lists", description: "Find options organized around common use cases.", href: "/best/" },
    ],
  },
};

export default function HubPage({ id }: { id: string }) {
  const config = configs[id];
  if (!config) return null;
  return (
    <div className="hub-page">
      <SiteHeader />
      <main>
        <section className="hub-hero">
          <div className="hub-hero__orb hub-hero__orb--one" aria-hidden="true" />
          <div className="hub-hero__orb hub-hero__orb--two" aria-hidden="true" />
          <div className="hub-hero__inner">
            <div className="hub-eyebrow"><span>{config.icon}</span>{config.eyebrow}</div>
            <h1>{config.title} <span>{config.accent}</span></h1>
            <p>{config.description}</p>
            <div className="hub-proof"><span>✓ Practical research</span><span>✓ Clear guidance</span><span>✓ Business-focused insights</span></div>
          </div>
        </section>
        <section className="hub-content">
          <div className="hub-intro"><div><div className="hub-section-kicker">START HERE</div><h2>{config.cardsTitle}</h2></div><p>{config.intro}</p></div>
          <div className="hub-card-grid">
            {config.cards.map((card) => <article className="hub-card" key={card.title}>
              <div className="hub-card__top"><span className={`hub-card__icon hub-tone--${card.tone}`}>{card.icon}</span><span className="hub-card__category">{card.category}</span></div>
              <h3><a href={card.href}>{card.title}</a></h3>
              <p>{card.description}</p>
              <a className="hub-card__link" href={card.href}>{card.cta} <span aria-hidden="true">→</span></a>
            </article>)}
          </div>
          <section className="hub-topic-panel" aria-labelledby={`topics-${id}`}>
            <div><div className="hub-section-kicker">EXPLORE FURTHER</div><h2 id={`topics-${id}`}>{config.topicsTitle}</h2><p>Follow a relevant path to explore related reviews, comparisons, alternatives, and guides.</p></div>
            <div className="hub-topic-links">{config.topics.map((topic) => <a href={topic.href} key={topic.label}>{topic.label}<span aria-hidden="true">↗</span></a>)}</div>
          </section>
          <section className="hub-related">
            <div className="hub-section-kicker">KEEP EXPLORING</div><h2>{config.relatedTitle}</h2>
            <div className="hub-related-grid">{config.related.map((item) => <a className="hub-related-card" href={item.href} key={item.title}><span>{item.title}</span><p>{item.description}</p><b>Explore <span aria-hidden="true">→</span></b></a>)}</div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
