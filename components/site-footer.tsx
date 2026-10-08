import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-shell">
      <div className="grid gap-8 border-t border-[var(--rule)] py-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--accent)]">
            Continue the conversation
          </p>
          <p className="max-w-xl text-lg leading-relaxed tracking-[-0.02em] text-[var(--ink)]">
            Interested in careful data systems, useful AI, or dependable
            automation?
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold">
          <a className="text-link" href={siteConfig.linkedin}>
            Connect on LinkedIn
            <span className="sr-only"> with Julian Griffin</span>
          </a>
          <a className="text-link" href={siteConfig.github}>
            View GitHub
            <span className="sr-only"> profile for Julian Griffin</span>
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-[var(--rule)] py-6 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--muted)] sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Julian Griffin</p>
        <p>{siteConfig.location}</p>
      </div>
    </footer>
  );
}
