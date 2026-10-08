const FALLBACK_SITE_URL = "https://juliangriffin11.github.io";

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
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  github: "https://github.com/JulianGriffin11",
  linkedin: "https://www.linkedin.com/in/juliangriffin11/",
  location: "Mississauga, Ontario, Canada",
} as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}
