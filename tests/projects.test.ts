import { describe, expect, it } from "vitest";

import { projectMediaSrc } from "@/lib/project-media";
import { getProject, projects } from "@/lib/projects";

describe("project data", () => {
  it("contains the complete, unique project set", () => {
    const slugs = projects.map((project) => project.slug);

    expect(slugs).toEqual([
      "cruise-assistant",
      "earnings-helper",
      "stock-news",
    ]);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(projects)(
    "keeps required case-study content complete for $slug",
    (project) => {
      expect(project.title.length).toBeGreaterThan(0);
      expect(project.summary.length).toBeGreaterThan(80);
      expect(project.problem.length).toBeGreaterThan(80);
      expect(project.outcome.length).toBeGreaterThan(80);
      expect(project.flow.length).toBeGreaterThanOrEqual(5);
      expect(project.decisions.length).toBeGreaterThanOrEqual(4);
      expect(project.reliability.length).toBeGreaterThanOrEqual(3);
      expect(project.tradeoffs.length).toBeGreaterThanOrEqual(2);
      expect(project.limitations.length).toBeGreaterThanOrEqual(2);
      expect(project.nextImprovements.length).toBeGreaterThanOrEqual(3);
      expect(project.stack.length).toBeGreaterThanOrEqual(6);
      expect(project.repository).toMatch(
        /^https:\/\/github\.com\/JulianGriffin11\//,
      );
      expect(project.visualLabel).toMatch(/^System representation/);
    },
  );

  it("looks for a project recording beside the slug and ignores unknown files", () => {
    expect(projectMediaSrc("not-a-project")).toBeNull();
  });

  it("returns only known slugs", () => {
    expect(getProject("earnings-helper")?.title).toBe("Earnings Helper");
    expect(getProject("unknown-project")).toBeUndefined();
  });
});
