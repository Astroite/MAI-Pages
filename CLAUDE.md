# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing/promotional website for **MAI** — a local-first AI story director platform and multi-model collaborative discussion room. This repo is independent from the main application at `https://github.com/Astroite/MAI`.

The authoritative specification for all content, structure, and design decisions is `MAI_website_agent_brief.md` (Chinese language). Consult it before making any content or architecture decisions.

## Tech Stack

- **Framework:** Astro (static site generator, `dist/` output)
- **Language:** TypeScript
- **UI:** Astro components + optional React Islands (minimal, no heavy runtime)
- **Styling:** CSS custom properties in `src/styles/tokens.css` (no Tailwind unless explicitly added later)
- **Icons:** lucide-react or lucide
- **Package manager:** pnpm
- **Deployment:** Tencent Cloud EdgeOne Pages

## Commands

```bash
pnpm dev           # Start dev server
pnpm build         # Build static site
pnpm preview       # Preview production build
pnpm typecheck     # astro check (type-check .astro, .ts, .tsx)
pnpm sync-release  # Fetch latest MAI release and update releases.generated.json
```

> There is no ESLint config at the repo root — `pnpm lint` will fail. Use `pnpm typecheck` instead.

## Architecture

### Page structure

`src/pages/index.astro` is the only page — a single-page marketing site. All sections are composed there in order. `SiteShell.astro` wraps every page and provides the HTML shell with SEO meta tags, canonical URL, OG/Twitter cards, and Header/Footer.

### Component conventions

All UI is Astro components except `DownloadSection.tsx`, which is the sole React island. It's loaded with `client:visible` so it hydrates only when scrolled into view. It dynamically imports `releases.generated.json` on the client to render download links with mirror/GitHub fallback.

### Data flow for downloads

1. `scripts/sync-release.mjs` fetches GitHub API → writes `src/data/releases.generated.json`
2. The JSON is committed to git by the `sync-release.yml` workflow (runs every 6 hours, on `workflow_dispatch`, or via `repository_dispatch` type `mai-release` triggered from the main MAI repo on release)
3. `DownloadSection.tsx` reads the JSON at runtime; `mirrorUrl` points to Tencent COS, `githubUrl` is the fallback

**Env vars for `sync-release.mjs`:**
- `GITHUB_TOKEN` — optional, increases API rate limit
- `MAI_REPO` — default `Astroite/MAI`
- `COS_BASE_URL` — default `https://agent-mai-1255740528.cos.accelerate.myqcloud.com`

### Key files

```
src/
  lib/constants.ts          # SITE_URL, GITHUB_URL, titles
  lib/release.ts            # ReleaseData / ReleaseAsset types, helper formatters
  data/releases.generated.json  # auto-generated, committed to git
  data/features.ts          # features grid content
  data/nav.ts               # navigation items
  components/layout/SiteShell.astro  # page shell (SEO, header, footer)
  components/sections/DownloadSection.tsx  # only React island
  styles/tokens.css         # all CSS custom properties (--mai-* vars)
scripts/
  sync-release.mjs          # release fetch + write script
.github/workflows/
  sync-release.yml          # scheduled + dispatch workflow
```

## Design System

Color tokens (CSS custom properties in `tokens.css`):
- Background: `#f8fcfd` (cold white)
- Primary mint: `#16a69a` / strong: `#07887f` / soft: `#dff7f4`
- Blue: `#62bfe5` / soft: `#e6f6fc`
- Coral accent: `#f26b5b` / soft: `#fff0ed`
- Text: `#10212b` / muted: `#5d7280` / soft: `#8aa0aa`

Visual style: clean, minimal, cold white backgrounds, light shadows, max 8–12px border radius. No dark theme, no heavy 3D, no game-style aesthetics.

## Key Constraints

- **Chinese-language content** — all user-facing text is in Chinese.
- **Local-first philosophy** — the site promotes user-controlled data and API keys. Don't add analytics trackers or third-party scripts that contradict this.
- **Performance** — fast first paint, lazy-loaded images, no heavy runtime libraries, static assets compressed.
- **SEO** — every page needs title, meta description, Open Graph, Twitter Card, favicon, canonical link, sitemap, robots.txt.
- **Accessibility** — keyboard-navigable buttons, alt text on images, sufficient contrast, semantic HTML.
- **China-friendly downloads** — the Download section must support mirror URLs (e.g., Tencent COS) with GitHub as fallback. Never expose API tokens to the frontend.

## Release Sync

A build-time script (`scripts/sync-release.mjs`) fetches the latest release from `https://api.github.com/repos/Astroite/MAI/releases/latest` and writes `src/data/releases.generated.json`. GitHub Actions runs this on a schedule (every 6 hours). The Download page reads this JSON at build time.

## License

Apache License 2.0.
