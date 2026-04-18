# EntryTarget Blog

Source for [blog.entrytarget.com](https://blog.entrytarget.com/).

Built with [Astro](https://astro.build/) on top of the
[AstroPaper](https://github.com/satnaing/astro-paper) theme, with colours and
fonts aligned to the main [entrytarget.com](https://entrytarget.com) landing
(bege/preto, Outfit + IBM Plex Mono).

## Local development

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # emits dist/ + pagefind search index
pnpm preview  # serves the built site
```

## Writing a post

Create a new Markdown file in `src/data/blog/`:

```md
---
author: EntryTarget
pubDatetime: 2026-04-18T12:00:00-03:00
title: Post title
featured: false
draft: false
tags: [architecture, security]
description: One-sentence summary (used for OG + RSS).
---

Post body here.
```

Commit to `main`. The `Build & Deploy` workflow publishes to GitHub Pages
automatically; custom domain is handled via `public/CNAME`.

## Deploy

GitHub Actions → `actions/deploy-pages@v4`. Pages settings: **Source =
GitHub Actions**, custom domain `blog.entrytarget.com`, DNS CNAME pointing
`blog.entrytarget.com → entrytarget.github.io`.
