# Odalys Marín — Portfolio

A personal portfolio site for a photographer and visual designer: a home page, an about page, an image gallery with on-the-fly optimized images, a project showcase, and a contact page with social links.

## Design

The site uses a "darkroom editorial" aesthetic — a warm near-black background, bone-white text, and a single burnt-copper accent color, paired with the [Fraunces](https://fonts.google.com/specimen/Fraunces) display serif and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) for labels and metadata.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing via TanStack Router)
- [Vite 7](https://vite.dev) build tooling
- [Tailwind CSS 4](https://tailwindcss.com) with CSS custom-property theming
- [Content Collections](https://www.content-collections.dev) for type-safe project markdown
- [Netlify Image CDN](https://docs.netlify.com/image-cdn/overview/) for on-demand image resizing/format negotiation (used across the gallery, home page, about page, and project showcase)
- [Netlify Forms](https://docs.netlify.com/forms/setup/) for the contact form
- Deployed on [Netlify](https://netlify.com)

## Project structure

- `src/routes/` — pages: `index.tsx` (home), `about.tsx`, `gallery.tsx`, `projects.tsx`, `contact.tsx`
- `content/projects/` — markdown source for the project showcase, parsed by Content Collections
- `src/lib/images.ts` — small helper for building Netlify Image CDN URLs
- `src/components/Nav.tsx`, `src/components/Footer.tsx` — shared layout chrome
- `public/contact.html` — static form skeleton required for Netlify's build-time form detection

## Running locally

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:3000`. To exercise Netlify-specific features (Image CDN, Forms) locally, use the Netlify CLI instead:

```bash
netlify dev
```

## Build

```bash
npm run build
```
