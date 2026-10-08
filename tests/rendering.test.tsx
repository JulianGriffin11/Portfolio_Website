import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import Home from "@/app/page";
import ProjectPage from "@/app/work/[slug]/page";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

describe("rendered navigation and content", () => {
  it("renders accessible primary navigation with internal and external links", () => {
    const html = renderToStaticMarkup(<SiteHeader />);

    expect(html).toContain('aria-label="Primary navigation"');
    expect(html).toContain('href="/#work"');
    expect(html).toContain('href="/about"');
    expect(html).toContain(`href="${siteConfig.github}"`);
    expect(html).toContain(`href="${siteConfig.linkedin}"`);
    expect(html).toContain("opens in a new tab");
  });

  it("renders the headline and the current focus", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain(siteConfig.headline);
    expect(html).toContain("AI Engineer, Data Analyst, and in Data Science");
    expect(html).toContain("Keep it simple, stupid.");
    expect(html).toContain("End-to-end data solutions.");
    expect(html).toContain("Simple enough that another person can explain");
    expect(html).not.toContain("01 / Structure");
    expect(html).not.toContain("Communication, tied to the technical work.");
    expect(html).toContain("View selected work");
    expect(html).toContain("Stack:");
    expect(html).toContain("React, TypeScript, Python, Postgres, OpenAI, Langfuse, Render");
    expect(html).toContain("Python, Postgres, OpenAI, Pydantic, Resend, GitHub Actions");
    expect(html).not.toContain("Engineering focus:");
    expect(html).not.toContain("Read case study");
    expect(html).not.toContain('href="/work/');

    for (const project of projects) {
      expect(html).toContain(project.title);
      expect(html).toContain(`href="${project.repository}"`);
    }
  });

  it("renders the about page", () => {
    const html = renderToStaticMarkup(<AboutPage />);

    expect(html).toContain("Communication, tied to the technical work.");
    expect(html).toContain("data solutions, analytics, pipelines, and engineering");
    expect(html).toContain("one product");
    expect(html).toContain("Connect with me on LinkedIn");
    expect(html).toContain(siteConfig.linkedin);
  });

  it.each(projects)(
    "renders the $slug case study with evidence, limitations, source, and navigation",
    async (project) => {
      const page = await ProjectPage({
        params: Promise.resolve({ slug: project.slug }),
      });
      const html = renderToStaticMarkup(page);

      expect(html).toContain(`<h1>${project.title}</h1>`);
      expect(html).toContain("Representative evidence");
      expect(html).toContain("System representation");
      expect(html).toContain("Current limitations");
      expect(html).toContain(`href="${project.repository}"`);
      expect(html).toContain('aria-label="Case study navigation"');
    },
  );
});
