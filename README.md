# DBN Homes — front-end prototype

A deployable marketing front end for **DBN Homes**, a fixed-price home builder in
Melbourne's western growth corridor. This repository is the design source of truth for a
later WordPress/Elementor implementation.

**Status: the homepage is complete.** Every other route resolves to a real page explaining
that it belongs to the next stage, so the navigation can be walked end to end without a 404.

> The single job of this site: make a nervous first home buyer believe that the price on
> the screen is the price they will actually pay. Where a decision was ambiguous, the
> option that increases that belief won.

---

## Stack

| Layer         | Choice                                                             | Why                                                                                                             |
| ------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Framework     | **Astro** (static output)                                          | Ships zero framework JavaScript. Content Collections map 1:1 onto the WordPress custom post types this becomes. |
| Styling       | **Tailwind CSS v4**, CSS-first `@theme`                            | v4 tokens compile to CSS custom properties, which port directly to Elementor Global Colours and Global Fonts.   |
| Language      | **TypeScript**, `strict: true`                                     |                                                                                                                 |
| Interactivity | **Vanilla TypeScript modules**                                     | No React, Vue or Alpine. The filter logic has to be reimplementable in WordPress, so it stays framework-free.   |
| Content       | Content Collections with Zod schemas over JSON in `src/data/`      | Bad data fails the build instead of reaching the page.                                                          |
| Images        | `astro:assets` → AVIF with a WebP fallback                         |                                                                                                                 |
| Icons         | Lucide, inlined as SVG at build time                               | No icon font, no runtime library, no emoji.                                                                     |
| Fonts         | Self-hosted woff2 (Archivo Variable, IBM Plex Sans, IBM Plex Mono) | No render-blocking request to a third party.                                                                    |

Nine production dependencies. A new one needs a stated reason in the commit message.

## Commands

```bash
npm install
npm run dev        # localhost:4321
npm run build      # → dist/
npm run preview
npm run check      # astro check + tsc
npm run lint       # prettier --check
npm run format     # prettier --write
```

`npm run build` and `npm run check` must both pass clean before any task is called done.

## Structure

```
src/
├── assets/img/          processed by astro:assets
│   ├── brand/  designs/  estates/  hero/  interiors/
├── components/
│   ├── layout/          Header, MobileNav, Footer, MobileBar, SkipLink, Logo
│   ├── ui/              Button, Eyebrow, Pill, Icon, Section
│   ├── cards/           DesignCard, PackageCard
│   ├── sections/        the twelve homepage sections
│   └── signature/       DimensionLine.astro  ← the signature element
├── data/                tiers · designs · regions · estates · packages · reviews (JSON)
├── layouts/             BaseLayout.astro
├── lib/                 format.ts · images.ts · site.ts
├── pages/               index.astro · [...slug].astro · 404.astro
├── scripts/             nav.ts · home.ts · reveal.ts
└── styles/              theme.css  ← every token, single source of truth
tools/                   generate-packages.mjs
```

## Ground rules this codebase holds itself to

- **Tokens only.** No raw hex, px font-size or hardcoded duration outside `src/styles/theme.css`.
- **Numbers are the product.** Every price, area, frontage, lot number and date is set in
  IBM Plex Mono with `font-variant-numeric: tabular-nums` (the `.num` class).
- **Borders, not shadows.** Shadow is reserved for genuinely floating UI — dropdowns,
  drawers, sticky bars.
- **Never two adjacent sections on the same background.** paper → surface → limestone →
  paper, with teal kept for the closing CTA and the footer.
- **Nothing invented.** Every price, area and inclusion comes from a public source. Any
  value that could not be verified is flagged `verified: false` and listed in
  [DATA-VERIFICATION.md](DATA-VERIFICATION.md).
- **Metric only.** `210.06 m²` and `22.64 sq`. Never square feet.
- **WCAG 2.1 AA.** One `<h1>` per page, sequential headings, no heading chosen for its
  size, 44×44 minimum targets, visible focus rings, `prefers-reduced-motion` honoured.

See [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md), [ASSETS.md](ASSETS.md),
[DATA-VERIFICATION.md](DATA-VERIFICATION.md) and [DECISIONS.md](DECISIONS.md).

## Deployment

Static output, no server runtime — suits Cloudflare Pages or any static host.

`public/robots.txt` disallows everything and every page carries `noindex, nofollow`. This
is a preview build and must not be indexed alongside the production site. Removing that is
a deliberate later decision, not a default.
