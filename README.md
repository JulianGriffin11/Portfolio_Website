# Julian Griffin — Portfolio

A work-first portfolio for Julian Griffin, focused on data engineering, AI
engineering, and automation. The site is built with the Next.js App Router,
strict TypeScript, Tailwind CSS v4, and statically generated project content.

## Run the site locally

You need the current Node.js LTS release (Node 22 or newer) and npm. This is a
JavaScript/TypeScript project, so local Node dependencies replace the kind of
Python virtual environment you may use for a Python application.

1. Clone the repository and open its directory.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in a browser.

Stop the server with `Ctrl+C`.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server |
| `npm run lint` | Check source files with ESLint |
| `npm run typecheck` | Run strict TypeScript checks without emitting files |
| `npm test` | Run the Vitest test suite once (non-watch mode) |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve an existing production build |
| `npm run check` | Run lint, typecheck, tests, and the production build in sequence |

## Routes

- `/` — selected work, engineering approach, and about
- `/work/cruise-assistant`
- `/work/earnings-helper`
- `/work/stock-news`
- `/sitemap.xml`
- `/robots.txt`

Project copy, stack details, repository links, and case-study structure live in
`lib/projects.ts`. Updating that typed source updates both the homepage previews
and the project pages.

## Canonical site URL

Metadata, structured data, the sitemap, and robots output use
`NEXT_PUBLIC_SITE_URL`. Create `.env.local` when you know the public domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

Do not add a trailing path. If the variable is omitted or invalid, the site
uses `https://juliangriffin11.github.io` as a documented fallback. That
fallback is not a claim that the current site is deployed there.

## Deploy to Vercel

1. Import this GitHub repository into Vercel.
2. Keep the detected framework preset as **Next.js**.
3. Add `NEXT_PUBLIC_SITE_URL` with the final `https://` deployment or custom
   domain URL.
4. Deploy. Vercel runs `npm install` and `npm run build` automatically.
5. After assigning a custom domain, update `NEXT_PUBLIC_SITE_URL` and redeploy
   so canonical and structured-data URLs point to that domain.

No database, image host, or server-side secrets are required for this portfolio.
All known content is rendered statically, and the decorative system visuals are
local HTML and CSS.
