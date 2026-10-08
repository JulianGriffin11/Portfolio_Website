import { ProjectVisual } from "@/components/project-visual";
import { buttonVariants } from "@/components/ui/button";
import { projectMediaSrc } from "@/lib/project-media";
import type { Project } from "@/lib/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-preview">
      <div className="project-preview-copy">
        <div className="project-meta">
          <span>{project.index}</span>
          <span>{project.category}</span>
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-[var(--ink)] sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
          {project.summary}
        </p>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
          <strong className="font-semibold text-[var(--ink)]">Stack:</strong>{" "}
          {project.stack.join(", ")}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            className={buttonVariants({ variant: "outline" })}
            href={project.repository}
            rel="noreferrer"
            target="_blank"
          >
            Repository
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> for {project.title} (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <ProjectVisual
        compact
        mediaSrc={projectMediaSrc(project.slug)}
        project={project}
      />
    </article>
  );
}
