const FALLBACK_SITE_URL = "https://juliangriffin11.github.io";

function configuredSiteUrl(): string | undefined {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) return `https://${productionHost}`;

  return undefined;
}

function resolveSiteUrl(value: string | undefined): URL {
  try {
    return new URL(value ?? FALLBACK_SITE_URL);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export const siteConfig = {
  name: "Julian Griffin",
  title: "Julian Griffin — AI Engineer, Data Analyst & Data Science",
  description:
    "Julian Griffin is an AI Engineer and Data Analyst working in data science. He makes complex data simple.",
  headline: "I make complex data simple.",
  url: resolveSiteUrl(configuredSiteUrl()),
  github: "https://github.com/JulianGriffin11",
  linkedin: "https://www.linkedin.com/in/juliangriffin11/",
  location: "Mississauga, Ontario, Canada",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
