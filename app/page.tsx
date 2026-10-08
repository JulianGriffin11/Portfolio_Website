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
    "Statistics graduate working as an AI Engineer, Data Analyst, and in Data Science.",
  knowsAbout: [
    "Artificial intelligence engineering",
    "Data analysis",
    "Data science",
    "Analytics",
    "Financial information",
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
            <p className="eyebrow">AI Engineer · Data Analyst · Data Science</p>
            <h1 className="hero-title">{siteConfig.headline}</h1>
            <p className="hero-deck">
              I&apos;m Julian Griffin, a statistics graduate experienced with
              data, analytics, financial information, and business operations.
              I work as an AI Engineer, Data Analyst, and in Data Science.
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
              Simple enough that another person can explain the result without
              a walkthrough.
            </p>
            <p>
              Accuracy depends on that clarity: clear sources, plain rules, and
              a result someone else can check.
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
            <h2>End-to-end data solutions.</h2>
          </div>
          <p>
            Three projects that carry the data from the source through to a
            result someone can use.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="site-shell section-block" aria-labelledby="build-title">
        <div className="section-heading is-closing">
          <div>
            <p className="eyebrow">How I build</p>
            <h2 id="build-title">Keep it simple, stupid.</h2>
          </div>
          <p>
            Useful AI starts with clear data boundaries, inspectable decisions,
            and honest failure states.
          </p>
        </div>
      </section>
    </main>
  );
}
