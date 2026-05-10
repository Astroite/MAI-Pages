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
pnpm dev          # Start dev server
pnpm build        # Build static site
pnpm preview      # Preview production build
pnpm lint         # ESLint
pnpm typecheck    # astro check
```

## Directory Structure

```
src/
  assets/brand/, illustrations/
  components/layout/, sections/, ui/
  data/             # features.ts, nav.ts, releases.generated.json
  lib/              # release.ts, constants.ts
  pages/            # index.astro, download.astro, privacy.astro, changelog.astro
  styles/           # globals.css, tokens.css
public/
  favicon.svg, og/, screenshots/, downloads/
scripts/
  sync-release.mjs, mirror-release-assets.mjs
.github/workflows/
  sync-release.yml
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
