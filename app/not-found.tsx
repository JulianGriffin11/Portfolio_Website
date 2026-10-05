import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="site-shell" id="main-content">
      <section className="flex min-h-[65vh] max-w-3xl flex-col justify-center py-20">
        <p className="eyebrow">404 · Not found</p>
        <h1 className="text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">
          This page is outside the system.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
          The address may have changed, or the page may never have existed.
          Selected work is still available from the homepage.
        </p>
        <div className="mt-8">
          <Link className={buttonVariants({ variant: "primary" })} href="/">
            Return home
          </Link>
        </div>
      </section>
    </main>
  );
}
