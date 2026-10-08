import Link from "next/link";

import { siteConfig } from "@/lib/site";

function ExternalMark() {
  return (
    <svg
      aria-hidden="true"
      className="size-3"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path d="M3 9 9 3M4 3h5v5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="site-shell border-b border-[var(--rule)]">
      <div className="flex min-h-16 flex-wrap items-center justify-between gap-x-5 gap-y-2 py-3">
        <Link
          className="text-sm font-bold tracking-[-0.02em] text-[var(--ink)]"
          href="/"
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[var(--muted)] sm:gap-x-5">
            <li>
              <Link className="nav-link" href="/#work">
                Work
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>
            <li>
              <a
                className="nav-link inline-flex items-center gap-1"
                href={siteConfig.github}
                rel="noreferrer"
                target="_blank"
              >
                GitHub
                <ExternalMark />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                className="nav-link inline-flex items-center gap-1"
                href={siteConfig.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                LinkedIn
                <ExternalMark />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
