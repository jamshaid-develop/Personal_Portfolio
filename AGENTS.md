# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A personal portfolio site for a photographer/visual designer, built with TanStack Start and deployed on Netlify. Five pages: home, about, gallery, projects, contact.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (CSS custom properties for theme tokens) |
| UI Components | Radix UI + custom components |
| Content | Content Collections (type-safe markdown) for the project showcase |
| Images | Netlify Image CDN (`/.netlify/images`) for on-demand resize/format negotiation |
| Forms | Netlify Forms |
| Language | TypeScript 5.9 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── content
│   └── projects/            # Markdown source for the project showcase (parsed by Content Collections)
├── public
│   ├── contact.html          # Static contact-form skeleton, required for Netlify's build-time form detection
│   ├── favicon.ico
│   └── headshot-on-white.jpg
├── src
│   ├── components
│   │   ├── ui/                # Radix-based primitives (Badge, Card, Checkbox, HoverCard, Separator)
│   │   ├── Nav.tsx             # Top nav, shared across all routes via __root.tsx
│   │   └── Footer.tsx          # Footer with social links, shared across all routes
│   ├── lib
│   │   ├── images.ts           # optimizedImage() helper — builds Netlify Image CDN query URLs
│   │   └── utils.ts             # cn() class-merging helper
│   ├── routes
│   │   ├── __root.tsx           # Root layout: fonts, Nav, Footer, page shell
│   │   ├── index.tsx             # Home: hero, photo strip, featured work
│   │   ├── about.tsx              # About: bio, skills, timeline
│   │   ├── gallery.tsx             # Image gallery: filterable masonry grid + lightbox
│   │   ├── projects.tsx             # Project showcase, sourced from content/projects
│   │   └── contact.tsx               # Contact form (Netlify Forms) + social links
│   ├── router.tsx
│   └── styles.css                       # Theme tokens (oklch colors), font imports, custom utilities
├── content-collections.ts               # Zod schema for the `projects` collection
├── netlify.toml                         # Build config + Image CDN remote_images allowlist
└── vite.config.ts
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are defined by files in `src/routes/`. `__root.tsx` wraps every page with the shared `Nav` and `Footer`.

### Images

Gallery, home, about, and project images are served through Netlify's Image CDN via the `optimizedImage()` helper in `src/lib/images.ts`, which builds `/.netlify/images?url=...&w=...&fm=...` URLs. Remote source images (currently `picsum.photos`, used as photography placeholders) must be allowlisted under `[images.remote_images]` in `netlify.toml`. Swap in real photography by replacing the URLs in `src/routes/gallery.tsx`, `src/routes/index.tsx`, `src/routes/about.tsx`, and the frontmatter `image` field in `content/projects/*.md` — no other code changes are needed as long as the new source is either a local `public/` path or an allowlisted remote domain.

### Content Collections

The `projects` collection (`content-collections.ts`) defines the schema for `content/projects/*.md`: `title`, `year`, `role`, `description`, `tags`, `github`, `liveUrl`, `image`, `content`. Add a new project by dropping a new markdown file into `content/projects/`.

### Forms

The contact form submits via AJAX to `/contact.html`, a static skeleton file Netlify's build bot scans to register the form (SSR apps can't rely on client-rendered forms for build-time detection). If you add fields to the React form in `src/routes/contact.tsx`, mirror them in `public/contact.html`.

## Conventions

### Styling

- Tailwind utility classes; theme tokens (colors, radius) live in `src/styles.css` as CSS custom properties under `:root`
- Design system: dark background, bone-white foreground, single copper/amber accent (`--primary`)
- Display type: Fraunces (`.font-display`); labels/metadata: IBM Plex Mono (`.font-mono` / `font-mono` class)
- `cn()` helper (`src/lib/utils.ts`) for conditional class merging

### TypeScript

- Strict mode enabled
- Import paths use the `@/` alias for `src/*`
- Zod for content frontmatter validation

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
netlify dev      # Local dev with Netlify feature emulation (Image CDN, Forms)
```
