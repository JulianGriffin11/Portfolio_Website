export type ProjectSlug =
  | "cruise-assistant"
  | "earnings-helper"
  | "stock-news";

export type ProjectVisualKind = "retrieval" | "metrics" | "digest";

export interface ProjectDecision {
  title: string;
  detail: string;
}

export interface Project {
  slug: ProjectSlug;
  index: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  problem: string;
  story: string;
  flow: readonly string[];
  decisions: readonly ProjectDecision[];
  reliability: readonly string[];
  tradeoffs: readonly string[];
  limitations: readonly string[];
  nextImprovements: readonly string[];
  stack: readonly string[];
  languages: readonly string[];
  repository: string;
  visual: ProjectVisualKind;
  visualLabel: string;
  visualDescription: string;
  seoDescription: string;
}

export const projects = [
  {
    slug: "cruise-assistant",
    index: "01",
    title: "Cruise Assistant",
    category: "Document intelligence · Vertical RAG",
    summary:
      "A document-retrieval workflow for a cruise business that needs dependable answers about dates, prices, ports, and excursions hidden across itinerary PDFs.",
    outcome:
      "Each answer is grounded in retrieved itinerary pages and returned with cruise and page references, keeping the original document one step away from the response.",
    problem:
      "Cruise itinerary PDFs are information-dense and inconsistent. Repeatedly scanning them for a sailing date, cabin price, port, or excursion slows down a real small-business workflow—and a fluent answer without a traceable source is not useful enough.",
    story:
      "The product treats retrieval as the control layer. Deterministic ingestion, hybrid search, evidence thresholds, and page metadata decide what the model is allowed to interpret and write. Prompting supports the experience; it does not carry the reliability burden.",
    flow: [
      "Create cruise",
      "Upload PDF",
      "Extract, page-chunk & embed",
      "Run hybrid search",
      "Stream grounded answer",
      "Attach cruise & page citations",
    ],
    decisions: [
      {
        title: "Merge two search signals",
        detail:
          "PostgreSQL full-text and pgvector results are combined with reciprocal-rank fusion, so exact itinerary language and semantic similarity can reinforce one another.",
      },
      {
        title: "Gate weak evidence",
        detail:
          "Weak vector-only matches are filtered, and the assistant refuses to answer when retrieval returns no qualifying source. Hallucination control begins before generation.",
      },
      {
        title: "Make citations deterministic",
        detail:
          "Cruise identity and PDF page metadata travel with each chunk. The application builds source markers from that metadata rather than asking the model to invent citations.",
      },
      {
        title: "Keep ingestion recoverable",
        detail:
          "Processing status is persisted so failed or stuck ingestion can be identified and retried without recreating the cruise workspace.",
      },
    ],
    reliability: [
      "Persisted ingestion states make incomplete document processing visible and retryable.",
      "Database migrations keep storage, chunk, and vector schema changes explicit.",
      "Streaming improves response feedback while citations remain tied to the retrieved context.",
    ],
    tradeoffs: [
      "A strict evidence threshold can withhold an answer that a person might infer, but it avoids presenting unsupported details as fact.",
      "Hybrid retrieval adds indexing and ranking complexity in exchange for better coverage across exact terms and paraphrased questions.",
    ],
    limitations: [
      "The repository does not substantiate a verified live deployment; the case study therefore describes the implemented system, not public uptime.",
      "A formal automated test suite is not committed, leaving important retrieval and ingestion behavior without repeatable regression coverage.",
    ],
    nextImprovements: [
      "Add ingestion, retrieval, and citation integration tests to CI.",
      "Build a representative evaluation set for answer support, citation accuracy, and appropriate refusal.",
      "Expose clearer operator diagnostics for extraction quality and recurring ingestion failures.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Python",
      "Postgres",
      "OpenAI",
      "Langfuse",
      "Render",
    ],
    languages: ["TypeScript", "Python", "SQL"],
    repository: "https://github.com/JulianGriffin11/Cruise_Assistant",
    visual: "retrieval",
    visualLabel: "System representation · grounded document answer",
    visualDescription:
      "A representative question is answered beside three source markers that point back to itinerary pages.",
    seoDescription:
      "Case study for Cruise Assistant, a hybrid-search document intelligence workflow with grounded answers, deterministic citations, and recoverable PDF ingestion.",
  },
  {
    slug: "earnings-helper",
    index: "02",
    title: "Earnings Helper",
    category: "Financial data engineering · Analysis",
    summary:
      "A financial research workflow that resolves SEC filing facts, calculates comparable year-over-year changes, and gives an AI model checked values to interpret.",
    outcome:
      "Comparable quarterly and annual values are normalized into a structured debrief and report, with deterministic calculations completed before narrative interpretation.",
    problem:
      "Investors often locate the same figures across SEC filings, decide which periods are actually comparable, and calculate year-over-year changes by hand. XBRL tags and fiscal calendars make that process less uniform than the final numbers suggest.",
    story:
      "The engineering work is primarily financial-data normalization. SEC facts, reporting durations, fallbacks, derived values, and cache state are handled in code; the model receives a typed debrief of checked values and focuses on interpretation.",
    flow: [
      "Search ticker or company",
      "Resolve SEC CIK",
      "Load XBRL facts",
      "Select comparable periods",
      "Calculate YoY & cache",
      "Build typed debrief & report",
    ],
    decisions: [
      {
        title: "Treat tags as fallbacks, not constants",
        detail:
          "A prioritized set of XBRL tags handles issuers that report equivalent concepts under different names, while keeping the chosen source explicit.",
      },
      {
        title: "Compare matching durations",
        detail:
          "Quarterly and annual facts are selected by reporting duration, with logic for fiscal-calendar drift instead of assuming every period ends on a fixed date.",
      },
      {
        title: "Derive only transparent values",
        detail:
          "Gross profit can be derived from revenue and cost when a direct fact is absent. The arithmetic stays deterministic and separate from model interpretation.",
      },
      {
        title: "Use a typed model boundary",
        detail:
          "Inline XBRL provides a fallback when company facts are insufficient, and OpenAI structured output is parsed into typed debrief data before report rendering.",
      },
    ],
    reliability: [
      "PostgreSQL caching reduces repeated SEC requests while preserving normalized facts for later report generation.",
      "SQLAlchemy models and Alembic migrations provide explicit persistence changes.",
      "Structured model output constrains the debrief shape and keeps downstream rendering predictable.",
    ],
    tradeoffs: [
      "Fallback chains broaden issuer coverage but require careful provenance so derived and directly reported values are not confused.",
      "Duration-aware selection is more involved than choosing the newest fact, but avoids misleading quarter-to-annual comparisons.",
    ],
    limitations: [
      "No public deployment is verified from the repository, so this case study makes no claim about live availability.",
      "Formal committed tests and CI are absent; fiscal edge cases and issuer-specific fallbacks need stronger automated regression coverage.",
    ],
    nextImprovements: [
      "Create fixture-based tests across standard, 52/53-week, and shifted fiscal calendars.",
      "Display fact provenance and derivation steps beside every reported metric.",
      "Add report-level checks that fail closed when comparable periods cannot be established.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Python",
      "Postgres",
      "OpenAI",
      "Langfuse",
      "Render",
    ],
    languages: ["TypeScript", "Python", "SQL"],
    repository: "https://github.com/JulianGriffin11/Earnings-Helper",
    visual: "metrics",
    visualLabel: "System representation · comparable metrics panel",
    visualDescription:
      "A representative metrics panel shows illustrative revenue, gross profit, and earnings-per-share values with year-over-year changes.",
    seoDescription:
      "Case study for Earnings Helper, a financial-data system that normalizes SEC XBRL facts, calculates comparable YoY changes, and produces typed AI debriefs.",
  },
  {
    slug: "stock-news",
    index: "03",
    title: "Stock News",
    category: "Research automation · Scheduled delivery",
    summary:
      "A stateful research pipeline that gathers company news and SEC activity, removes short-term noise, ranks durable signals, and sends a responsive weekly email.",
    outcome:
      "Scheduled runs produce a deduplicated, criteria-ranked digest and guard delivery state so the same weekly research is not intentionally sent twice.",
    problem:
      "Long-term investors repeatedly monitor company news and SEC filings while filtering price chatter, duplicate coverage, and routine insider transactions that do not change the underlying thesis.",
    story:
      "This is operational automation rather than a web interface. Scheduled ingestion, durable identifiers, validated ranking output, delivery state, and database migrations make the workflow repeatable; the model summarizes and ranks only after deterministic filters run.",
    flow: [
      "Run scheduled ingestion",
      "Read Yahoo RSS & SEC filings",
      "Filter, dedupe & upsert",
      "Summarize concurrently",
      "Rank long-term relevance",
      "Render email & deliver via Resend",
    ],
    decisions: [
      {
        title: "Parallelize independent collection",
        detail:
          "Yahoo and SEC sources are ingested in parallel, and eligible items are summarized concurrently to keep a scheduled batch bounded.",
      },
      {
        title: "Make runs idempotent",
        detail:
          "Stable external identifiers and a unique weekly run record turn repeated ingestion into upserts and prevent intentional duplicate sends.",
      },
      {
        title: "Validate model-ranked IDs",
        detail:
          "Pydantic schemas constrain summary and ranking output, while ranked IDs are checked against the supplied candidate set before content is rendered.",
      },
      {
        title: "Filter Form 4 noise in code",
        detail:
          "Rules exclude amendments, grants, tax withholding, 10b5-1 sales, small sales, and transactions by non-officers before the model evaluates relevance.",
      },
    ],
    reliability: [
      "GitHub Actions provides the schedule, while persisted run state separates collection, generation, and delivery concerns.",
      "External IDs support deduplicated upserts across retried or overlapping source responses.",
      "Duplicate-send protection checks weekly delivery state before Resend is called.",
    ],
    tradeoffs: [
      "Rule-based Form 4 filters reduce noise consistently, but thresholds and role definitions need maintenance as research preferences change.",
      "Email delivery removes the need to check another interface, while making concise ranking and responsive rendering more important.",
    ],
    limitations: [
      "External feeds, SEC endpoints, model APIs, and email delivery can still fail; scheduling a run does not guarantee every upstream service succeeds.",
      "Ranking reflects encoded long-term criteria and should support research, not replace source review or constitute financial advice.",
    ],
    nextImprovements: [
      "Add replayable fixtures and integration tests for ingestion, idempotency, and duplicate-send boundaries.",
      "Record per-stage run diagnostics and alert only on actionable collection or delivery failures.",
      "Add user-controlled ranking criteria while preserving deterministic pre-filters.",
    ],
    stack: [
      "Python",
      "Postgres",
      "OpenAI",
      "Pydantic",
      "Resend",
      "GitHub Actions",
    ],
    languages: ["Python", "SQL", "HTML"],
    repository: "https://github.com/JulianGriffin11/Stock_News",
    visual: "digest",
    visualLabel: "System representation · scheduled research digest",
    visualDescription:
      "A representative weekly email digest shows ranked company updates moving from source collection to delivery.",
    seoDescription:
      "Case study for Stock News, a scheduled and stateful research automation that filters company news and SEC filings into a long-term investor email digest.",
  },
] as const satisfies readonly Project[];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
