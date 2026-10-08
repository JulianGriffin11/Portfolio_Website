import fs from "node:fs";
import path from "node:path";

const mediaDirectory = path.join(process.cwd(), "public", "images", "projects");

const mediaExtensions = ["gif", "webp", "png", "jpg", "jpeg"] as const;

/**
 * A recording dropped at public/images/projects/<slug>.gif replaces the
 * diagram for that project. cruise-assistant, earnings-helper, and stock-news
 * are the current slugs. webp, png, jpg, and jpeg are accepted in that order
 * after gif.
 */
export function projectMediaSrc(slug: string): string | null {
  for (const extension of mediaExtensions) {
    const filename = `${slug}.${extension}`;
    if (fs.existsSync(path.join(mediaDirectory, filename))) {
      return `/images/projects/${filename}`;
    }
  }

  return null;
}
