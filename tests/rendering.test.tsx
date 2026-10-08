import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

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
    expect(html).toContain('href="/#about"');
    expect(html).toContain(`href="${siteConfig.github}"`);
    expect(html).toContain(`href="${siteConfig.linkedin}"`);
    expect(html).toContain("opens in a new tab");
  });

  it("renders the headline and the current focus", () => {
    const html = renderToStaticMarkup(<Home />);

    expect(html).toContain(siteConfig.headline);
    expect(html).toContain("AI Engineer, Data Analyst, and in Data Science");
    expect(html).toContain("Keep it simple, stupid.");
    expect(html).toContain("View selected work");

    for (const project of projects) {
      expect(html).toContain(project.title);
      expect(html).toContain(`href="/work/${project.slug}"`);
    }
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
