import type { Metadata } from "next";

import { buttonVariants } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/lib/site";

const description =
  "Julian Griffin ties communication to data solutions, analytics, pipelines, and engineering, and brings those pieces into one product.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    url: absoluteUrl("/about"),
    title: "About — Julian Griffin",
    description,
  },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="site-shell about-section">
        <div>
          <p className="eyebrow">About</p>
          <h1>Communication, tied to the technical work.</h1>
        </div>
        <div className="about-copy">
          <p>
            I work across data solutions, analytics, pipelines, and engineering.
            Communication sits in the middle of that work. A result is useful
            when another person can follow it and explain it.
          </p>
          <p>
            I bring those pieces into one product. The analysis, the pipeline,
            and the explanation should read as the same thing, so what gets
            built is also what someone can trust and use.
          </p>
          <a className={buttonVariants({ variant: "text" })} href={siteConfig.linkedin}>
            Connect with me on LinkedIn
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
