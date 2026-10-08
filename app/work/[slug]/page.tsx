import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectVisual } from "@/components/project-visual";
import { SystemFlow } from "@/components/system-flow";
import { buttonVariants } from "@/components/ui/button";
import { getProject, projects } from "@/lib/projects";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const path = `/work/${project.slug}`;

  return {
    title: project.title,
    description: project.seoDescription,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(path),
      title: `${project.title} — Julian Griffin`,
      description: project.seoDescription,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title: `${project.title} — Julian Griffin`,
      description: project.seoDescription,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject =
    projectIndex > 0 ? projects[projectIndex - 1] : undefined;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : undefined;
  const projectUrl = absoluteUrl(`/work/${project.slug}`);
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${projectUrl}#software`,
    name: project.title,
    description: project.seoDescription,
    url: projectUrl,
    codeRepository: project.repository,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    programmingLanguage: project.languages,
    keywords: project.stack.join(", "),
  };

  return (
    <main id="main-content">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd).replaceAll("<", "\\u003c"),
        }}
        type="application/ld+json"
      />
      <article>
        <header className="site-shell case-hero">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#work">Work</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{project.index}</li>
            </ol>
          </nav>
          <div className="case-title-grid">
            <div>
              <p className="eyebrow">{project.category}</p>
              <h1>{project.title}</h1>
            </div>
            <p>{project.summary}</p>
          </div>
          <div className="case-actions">
            <a
              className={buttonVariants({ variant: "primary" })}
              href={project.repository}
            >
              View source repository
              <span aria-hidden="true">↗</span>
              <span className="sr-only"> for {project.title}</span>
            </a>
            <Link
              className={buttonVariants({ variant: "text" })}
              href="#system"
            >
              Explore the system
              <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </header>

        <section className="site-shell case-section case-intro">
          <div>
            <p className="eyebrow">Outcome</p>
            <h2>What the system delivers</h2>
          </div>
          <div className="case-prose">
            <p className="case-lead">{project.outcome}</p>
            <p>{project.story}</p>
          </div>
        </section>

        <section
          aria-labelledby="evidence-title"
          className="site-shell case-section"
        >
          <div>
            <p className="eyebrow">Representative evidence</p>
            <h2 id="evidence-title">The output, without pretending it is a screenshot.</h2>
          </div>
          <div>
            <ProjectVisual project={project} />
            <p className="evidence-note">
              This original diagram communicates the product&apos;s information
              shape. It is a system representation, not a live product capture.
            </p>
          </div>
        </section>

        <section className="site-shell case-section">
          <div>
            <p className="eyebrow">User problem</p>
            <h2>Start with the repeated decision.</h2>
          </div>
          <div className="case-prose">
            <p className="case-lead">{project.problem}</p>
          </div>
        </section>

        <section className="site-shell case-section" id="system">
          <div>
            <p className="eyebrow">System &amp; data flow</p>
            <h2>From source to useful output.</h2>
          </div>
          <SystemFlow steps={project.flow} />
        </section>

        <section className="site-shell case-section">
          <div>
            <p className="eyebrow">Key decisions</p>
            <h2>Put reliability in the architecture.</h2>
          </div>
          <ol className="decision-list">
            {project.decisions.map((decision, index) => (
              <li key={decision.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{decision.title}</h3>
                  <p>{decision.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="site-shell case-section">
          <div>
            <p className="eyebrow">Reliability &amp; trade-offs</p>
            <h2>What the design protects—and what it costs.</h2>
          </div>
          <div className="split-lists">
            <div>
              <h3>Reliability controls</h3>
              <ul>
                {project.reliability.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Trade-offs</h3>
              <ul>
                {project.tradeoffs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="site-shell case-section">
          <div>
            <p className="eyebrow">Honest boundaries</p>
            <h2>Limitations and next improvements.</h2>
          </div>
          <div className="split-lists">
            <div>
              <h3>Current limitations</h3>
              <ul>
                {project.limitations.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Next improvements</h3>
              <ul>
                {project.nextImprovements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="site-shell case-section case-stack">
          <div>
            <p className="eyebrow">Stack</p>
            <h2>Tools chosen for the data path.</h2>
          </div>
          <ul aria-label={`${project.title} technology stack`}>
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </section>

        <nav
          aria-label="Case study navigation"
          className="site-shell project-pagination"
        >
          <div>
            {previousProject ? (
              <Link href={`/work/${previousProject.slug}`}>
                <span>Previous case study</span>
                {previousProject.title}
              </Link>
            ) : (
              <Link href="/#work">
                <span>Selected work</span>
                All projects
              </Link>
            )}
          </div>
          <div className="text-right">
            {nextProject ? (
              <Link href={`/work/${nextProject.slug}`}>
                <span>Next case study</span>
                {nextProject.title}
              </Link>
            ) : (
              <Link href="/#work">
                <span>Back to</span>
                Selected work
              </Link>
            )}
          </div>
        </nav>
      </article>
    </main>
  );
}
