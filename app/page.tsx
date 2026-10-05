import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/lib/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  sameAs: [siteConfig.github, siteConfig.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mississauga",
    addressRegion: "Ontario",
    addressCountry: "CA",
  },
  description:
    "Statistics graduate focused on data engineering, AI engineering, and automation.",
  knowsAbout: [
    "Data engineering",
    "Artificial intelligence engineering",
    "Analytics",
    "Financial information",
    "Business process automation",
  ],
};

export default function Home() {
  return (
    <main id="main-content">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replaceAll("<", "\\u003c"),
        }}
        type="application/ld+json"
      />

      <section className="site-shell hero">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Data · AI · Automation</p>
            <h1 className="hero-title">{siteConfig.headline}</h1>
            <p className="hero-deck">
              I&apos;m Julian Griffin, a statistics graduate experienced with
              data, analytics, financial information, and business operations.
              I focus on Data Engineering, AI Engineering, and Automation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className={buttonVariants({ variant: "primary" })}
                href="/#work"
              >
                View selected work
                <span aria-hidden="true">↓</span>
              </Link>
              <a
                className={buttonVariants({ variant: "outline" })}
                href={siteConfig.github}
              >
                Explore GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <aside className="hero-aside" aria-label="Engineering approach">
            <p className="eyebrow">Working principle</p>
            <p>
              Deterministic systems own retrieval, calculations, filtering,
              state, and delivery.
            </p>
            <p>
              Language models are used selectively for interpretation, ranking,
              and writing—where judgment adds value.
            </p>
            <div className="hero-location">
              <span aria-hidden="true" className="status-dot" />
              {siteConfig.location}
            </div>
          </aside>
        </div>
      </section>

      <section className="site-shell section-block" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>Systems built around real information problems.</h2>
          </div>
          <p>
            Three projects spanning document intelligence, financial data, and
            stateful research automation.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="site-shell section-block" aria-labelledby="build-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">How I build</p>
            <h2 id="build-title">Keep intelligence inside a reliable system.</h2>
          </div>
          <p>
            Useful AI starts with clear data boundaries, inspectable decisions,
            and honest failure states.
          </p>
        </div>
        <ol className="principles">
          <li>
            <span>01 / Structure</span>
            <h3>Model the data path first.</h3>
            <p>
              Make sources, transformations, identifiers, and state explicit
              before adding a model.
            </p>
          </li>
          <li>
            <span>02 / Judgment</span>
            <h3>Use models for bounded work.</h3>
            <p>
              Give language models checked context and narrow responsibilities:
              interpret, rank, or write.
            </p>
          </li>
          <li>
            <span>03 / Operations</span>
            <h3>Design the failure path too.</h3>
            <p>
              Prefer idempotency, validation, citations, retries, and visible
              state over optimistic execution.
            </p>
          </li>
        </ol>
      </section>

      <section className="site-shell about-section" id="about">
        <div>
          <p className="eyebrow">About</p>
          <h2>Technical depth, tied to the business question.</h2>
        </div>
        <div className="about-copy">
          <p>
            My statistics background shapes how I approach software: define
            what the data means, preserve comparability, and make uncertainty
            visible. Experience with financial information and business
            operations keeps the work anchored to decisions people actually
            need to make.
          </p>
          <p>
            I&apos;m especially interested in the connective work between data
            sources, backend systems, model boundaries, and dependable
            delivery.
          </p>
          <a className={buttonVariants({ variant: "text" })} href={siteConfig.linkedin}>
            Connect with me on LinkedIn
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
