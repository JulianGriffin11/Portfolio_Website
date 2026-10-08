import type { Project } from "@/lib/projects";

interface ProjectVisualProps {
  project: Project;
  mediaSrc: string | null;
  compact?: boolean;
}

function RetrievalVisual() {
  return (
    <div className="visual-grid visual-retrieval">
      <div className="visual-document">
        <div className="visual-kicker">Question</div>
        <p className="visual-question">
          Which day reaches Skagway, and what can guests do there?
        </p>
        <div className="visual-answer">
          <span aria-hidden="true" className="answer-rule answer-rule-long" />
          <span aria-hidden="true" className="answer-rule" />
          <span aria-hidden="true" className="answer-rule answer-rule-short" />
        </div>
      </div>
      <div className="visual-sources">
        <div className="visual-kicker">Grounded sources</div>
        <span>Alaska Explorer · p. 04</span>
        <span>Port guide · p. 11</span>
        <span>Excursions · p. 12</span>
      </div>
    </div>
  );
}

function MetricsVisual() {
  return (
    <div className="visual-metrics">
      <div className="visual-metrics-head">
        <span className="visual-kicker">Comparable period analysis</span>
        <span>Illustrative values</span>
      </div>
      <div className="metrics-table">
        <div>
          <span>Revenue</span>
          <strong>$12.4B</strong>
          <em>+7.8% YoY</em>
        </div>
        <div>
          <span>Gross profit</span>
          <strong>$5.1B</strong>
          <em>+6.2% YoY</em>
        </div>
        <div>
          <span>Diluted EPS</span>
          <strong>$1.84</strong>
          <em>+9.5% YoY</em>
        </div>
      </div>
      <p className="visual-disclaimer">
        Representative system output · Not financial advice
      </p>
    </div>
  );
}

function DigestVisual() {
  return (
    <div className="visual-digest">
      <div className="digest-head">
        <div>
          <span className="visual-kicker">Weekly company brief</span>
          <strong>Long-term signals, ranked</strong>
        </div>
        <span className="digest-status">Ready to send</span>
      </div>
      <ol className="digest-items">
        <li>
          <span>01</span>
          <p>Operating update with durable business context</p>
          <em>High relevance</em>
        </li>
        <li>
          <span>02</span>
          <p>SEC filing change worth source review</p>
          <em>Review</em>
        </li>
        <li>
          <span>03</span>
          <p>Material company announcement, duplicates removed</p>
          <em>Monitor</em>
        </li>
      </ol>
      <div className="digest-path" aria-label="Delivery path">
        <span>Sources</span>
        <span aria-hidden="true">→</span>
        <span>Filter + rank</span>
        <span aria-hidden="true">→</span>
        <span>Email</span>
      </div>
    </div>
  );
}

export function ProjectVisual({
  project,
  mediaSrc,
  compact = false,
}: ProjectVisualProps) {
  const caption = mediaSrc ? "Product recording" : project.visualLabel;
  const description = mediaSrc
    ? `A recording of ${project.title} in use.`
    : project.visualDescription;

  return (
    <figure
      className={compact ? "project-visual project-visual-compact" : "project-visual"}
      aria-describedby={`visual-description-${project.slug}`}
      aria-labelledby={`visual-caption-${project.slug}`}
    >
      <div className={mediaSrc ? "visual-canvas has-media" : "visual-canvas"}>
        {mediaSrc ? (
          <img
            alt=""
            className="project-media"
            src={mediaSrc}
          />
        ) : (
          <>
            {project.visual === "retrieval" && <RetrievalVisual />}
            {project.visual === "metrics" && <MetricsVisual />}
            {project.visual === "digest" && <DigestVisual />}
          </>
        )}
      </div>
      <figcaption
        className="visual-caption"
        id={`visual-caption-${project.slug}`}
      >
        <span>{caption}</span>
        <span aria-hidden="true">↗</span>
      </figcaption>
      <p className="sr-only" id={`visual-description-${project.slug}`}>
        {description}
      </p>
    </figure>
  );
}
