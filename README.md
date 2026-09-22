# John T. Campbell Jr.

A static personal engineering journal built with Astro, Markdown, and MDX. Configured for **https://johncampbelljr.com** and GitHub Pages. Fonts are self-hosted; the initial pages ship no client JavaScript, analytics, cookies, or third-party requests.

## Local development

Use Node.js **22.12 or newer**.

```sh
npm ci
npm run dev
```

Open http://localhost:4321. To check types and build the static site:

```sh
npm run build
npm run preview
```

The deployable output is `dist/`. For the browser and accessibility checks:

```sh
npx playwright install chromium
npm run build
npm test
```

The suite checks all pages at desktop, 390px and 320px widths; navigation; WCAG A/AA rules through axe; local links; canonical URLs; static assets; and the absence of client scripts. Automated accessibility checks complement, rather than replace, manual review.

## Publish an article

Add a `.md` or `.mdx` file under `content/writing/`:

```yaml
---
title: Your article title
description: A short summary for indexes, search, and social sharing.
slug: your-article-slug
date: 2026-09-22
tags: [Engineering, Agentic SDLC]
featured: true
draft: false
placeholder: false
series: Building an Agentic-First SDLC
order: 2
---
```

Write the article below the frontmatter. `slug` controls the URL, independently of the filename. Use a unique, lowercase, hyphenated slug. `date` is the real publication date; don't assign publication dates to unfinished work. `series` and `order` are optional. `draft: true` excludes the entry from pages, indexes, and RSS. `placeholder: true` displays an outline notice and excludes it from RSS. Published, dated articles enter RSS automatically and are sorted newest first. The homepage shows up to three featured articles, falling back to the latest entries when none are featured.

Markdown supports headings, tables, footnotes, blockquotes, images, links, and syntax-highlighted fenced code blocks. MDX can import Astro components for diagrams or callouts. The project demonstrates a semantic HTML workflow diagram with no JavaScript. Mermaid rendering is not included in this milestone; use an exported SVG with meaningful alternative text, or an MDX component.

For a callout in MDX:

```mdx
<div className="callout">
  <strong>Working note.</strong> Your note here.
</div>
```

Use relative links between content pages (for example `../../projects/project-slug/` from an article) or import `url` from `src/lib/site.ts` in MDX. This preserves links when deploying under a repository base path. Images in `public/` are copied unchanged; use descriptive alt text. For imports and content validation, see `src/content.config.ts`.

The initial article is explicitly an outline. The four later series topics are planned entries on `src/pages/writing/index.astro`; turn them into content files when ready. The RSS feed is intentionally empty until there is a published, dated article.

## Add a project

Add Markdown or MDX under `content/projects/`:

```yaml
---
title: Project name
slug: project-slug
number: '002'
status: ACTIVE / EXPERIMENTAL
description: A short description.
featured: true
draft: false
technologies: []
relatedWriting: [your-article-slug]
# github: https://github.com/owner/repository
---
```

Use body sections for the problem, architecture, technical decisions, and lessons learned. `technologies`, `relatedWriting`, and `github` are optional. Leave unverified details out. The initial project deliberately has no invented stack, metrics, or source link.

## Deployment and custom domain

The repository's current default branch is `gh-pages`. `.github/workflows/deploy.yml` builds pull requests and deploys pushes to that branch, plus manual workflow runs. If you change the default branch, update the workflow trigger.

1. In GitHub **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.
2. Commit and push the rebuild to `gh-pages`. The workflow installs dependencies, checks types, builds, and uploads/deploys `dist/`.
3. In **Settings → Pages**, set the custom domain to `johncampbelljr.com`. `public/CNAME` already contains that domain.
4. Configure the domain's DNS for GitHub Pages, following [GitHub's current custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Enable **Enforce HTTPS** after the certificate is available.

The canonical domain is set in `astro.config.mjs`. This repository includes the configuration, but DNS and GitHub's Pages settings are external setup steps. No deployment is implied by a successful local build.

To preview a repository-path deployment instead of the custom domain:

```sh
SITE_URL=https://johncampbelljr.github.io BASE_PATH=/johncampbelljr npm run build
npm run preview
```

The `CNAME` file must be removed from that deployment if you intend to host without the custom domain.

## Structure and editing

- `content/writing/`, `content/projects/`: content, independent of presentation.
- `src/content.config.ts`: typed frontmatter schemas.
- `src/pages/`: page routes, content templates, RSS, and robots.txt.
- `src/layouts/Base.astro`: shared navigation, footer, canonical and OpenGraph metadata.
- `src/components/`: shared article rows, section labels, workflow diagram.
- `src/styles/global.css`: responsive typography and visual system.
- `src/lib/site.ts`: identity, social links, URL and date helpers.
- `public/`: favicon, social image, custom-domain declaration.

Experience dates, detailed achievements, and the current job title await verified source material. No dates or accomplishments have been invented. The footer's build label is an editorial marker, not an automated deployment counter.

To regenerate the social preview image after editing `scripts/generate-og.mjs`:

```sh
npx playwright install chromium
npm run generate:og
```

The site is based on Astro's [content collections](https://docs.astro.build/en/guides/content-collections/) and [GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) conventions.
