# Design system

Everything below is declared once, in [`src/styles/theme.css`](src/styles/theme.css).
Tailwind v4 compiles the `@theme` block to CSS custom properties, which is what makes this
portable: each token maps to an Elementor Global Colour or Global Font in the production
rebuild.

## Positioning

The visual language comes from **the documents of certainty** — the fixed-price quote, the
site plan, the schedule of inclusions, the surveyor's setout — executed with warmth and
generous space. Not corporate-navy, not luxury-cold, and not the warm-cream-and-serif look
that every quick rebuild arrives at.

## Colour

Derived from Australian residential materials — Colorbond roof colours, brick, concrete
primer — rather than a generic brand wheel.

| Token                 | Value                  | Role                                                                  |
| --------------------- | ---------------------- | --------------------------------------------------------------------- |
| `--color-ink`         | `#16211F`              | Body text and headings. A desaturated green-black, not pure charcoal. |
| `--color-forest`      | `#1F3B32`              | Primary. Buttons, dark bands, the closing CTA.                        |
| `--color-forest-lift` | `#2E5245`              | Hover on forest surfaces.                                             |
| `--color-forest-deep` | `#162923`              | Footer, hero letterbox fill.                                          |
| `--color-paper`       | `#F1F3F2`              | Page base — the colour of primed concrete.                            |
| `--color-surface`     | `#FFFFFF`              | Cards, panels, elevated content.                                      |
| `--color-limestone`   | `#E4DFD3`              | Warm alternating band, promo panels, floorplan panels.                |
| `--color-brick`       | `#8E3B2E`              | **Signal only.**                                                      |
| `--color-rule`        | `rgb(22 33 31 / 0.12)` | Hairlines.                                                            |
| `--color-mark`        | `#0B7C8A`              | The client's logo teal. Referenced, never restyled.                   |

**Discipline rules.**

1. `--color-brick` may occupy no more than about 2% of any viewport. It is reserved for
   availability pills, the land segment of the dimension line, the step numbers in the
   build process, and error states. Buttons are forest, never brick.
2. Never two adjacent sections on the same background: paper → surface → limestone →
   paper. Forest belongs to the closing CTA and the footer only.
3. Borders, not shadows. Default card treatment is `1px solid var(--color-rule)`; the
   border darkens to `--color-rule-strong` on hover. Shadow is for genuinely floating UI.

**The logo.** The client's mark is teal, which does not sit inside this palette. It is
never repainted: on light surfaces it renders exactly as supplied, and on dark bands it is
reversed to monochrome white (`filter: brightness(0) invert(1)`). The palette is not bent
around it.

## Type

| Role    | Family               | Usage                                                                                                                             |
| ------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Display | **Archivo Variable** | H1–H3, set semi-expanded at `font-variation-settings: 'wdth' 112`, weight 600. The width axis is the point — it reads as _built_. |
| Body    | **IBM Plex Sans**    | Prose, UI labels, buttons. Humanist and slightly engineered.                                                                      |
| Data    | **IBM Plex Mono**    | Every measurement, price, lot number, area, frontage, date.                                                                       |

**The most important typographic rule in the project:** every number is set in the mono
face with `font-variant-numeric: tabular-nums`, via the `.num` class. In this business the
numbers are the product; setting them in a tabular mono face is what makes the page read
like a document you can hold someone to rather than an advertisement.

Fluid scale, all `clamp()` from mobile to desktop:

| Token            | Range               | Line height                            |
| ---------------- | ------------------- | -------------------------------------- |
| `--text-display` | 2.75rem → 5.25rem   | 1.02, tracking −0.02em                 |
| `--text-h1`      | 2.25rem → 3.75rem   | 1.06, tracking −0.018em                |
| `--text-h2`      | 1.875rem → 2.75rem  | 1.12, tracking −0.014em                |
| `--text-h3`      | 1.375rem → 1.75rem  | 1.25                                   |
| `--text-lead`    | 1.0625rem → 1.25rem | 1.6                                    |
| `--text-body`    | 1rem                | 1.65                                   |
| `--text-small`   | 0.875rem            | 1.5                                    |
| `--text-eyebrow` | 0.75rem             | uppercase, tracking 0.14em, weight 600 |

Prose measure is capped at `--container-prose` (34rem, roughly 62–68 characters). Never
full width.

A heading level is never chosen for its size. Size comes from a class; the level comes
from the document outline.

## Space, grid, shape

- 4px base unit, 8px rhythm above 16px.
- `--spacing-section: clamp(4.5rem, 3rem + 6vw, 9rem)` block padding;
  `--spacing-section-tight` for slim bands.
- `--spacing-gutter: clamp(1.25rem, 4vw, 3rem)`.
- Containers: `--container-content` 1200px, `--container-wide` 1440px.
- 12 columns, and asymmetric splits (7/5, 8/4) are preferred over 6/6. Symmetry is what
  makes a page read as a template.
- Radii: `--radius-sm` 2px, `--radius-md` 4px (default), `--radius-lg` 8px. Nothing
  rounder — large radii read as SaaS, this is architecture.

## Components

**Buttons** — one component, three variants, two tones (`light` on pale surfaces, `dark`
on forest and over the hero scrim).

| Variant   | Spec                                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------- |
| Primary   | Forest fill, white text, 4px radius, 52px tall (48px on mobile). Hover lifts 1px to `--color-forest-lift`. |
| Secondary | Transparent with a 1px ink border. Hover inverts to an ink fill.                                           |
| Tertiary  | Ink text, underline at 4px offset, trailing arrow that shifts 3px on hover.                                |

Every interactive element gets `outline: 2px solid currentColor; outline-offset: 3px` on
`:focus-visible`, and a minimum target of 44×44px.

**Cards** — 4:3 image, eyebrow, H3, mono spec row, hairline, footer. Hover scales the image
`1.03` over 600ms and darkens the border. No lift, no shadow bloom.

**Icons** — Lucide, inlined as SVG, 1.5px stroke, 20px inline / 24px feature. Always paired
with a visible label or an `aria-label`.

**Forms** — labels always visible above the field, 52px field height, 1px rule border, 4px
radius. Placeholders are examples, never labels. Errors carry text and an icon, never
colour alone.

## The signature element — the Dimension Line

`src/components/signature/DimensionLine.astro`.

The architectural dimension annotation — the hairline rule with vertical tick terminators
used to mark measurements on a floor plan — applied to money instead of millimetres. Every
competitor in this segment shows a big number with an asterisk; this shows the number and
opens it up.

- **Compact** (package cards): one line beneath the price, segments proportional to their
  real dollar share, labels in 12px mono.
- **Expanded** (the homepage certainty section, later the package page): a stacked
  breakdown where each component is a dimensioned segment, included items ticked, closing
  on a total labelled _Nothing more to pay_.

Geometry is real SVG so the ticks stay hairlines at any width; labels are HTML so they
hold their true 12px rather than scaling with the drawing. Strokes are `--color-forest` at
40% opacity, and the land segment is the one place `--color-brick` appears in the
component. Segment widths are computed from the values passed in — never hardcoded.

**Motion.** The rule draws itself left to right on first scroll into view using
`pathLength="1"` with `stroke-dasharray`/`stroke-dashoffset`, over `--duration-image` on
`--ease-out`, once only. The starting state is gated behind `html.js`, so with scripting
off the breakdown simply renders complete. Under `prefers-reduced-motion: reduce` it
renders complete immediately.

**Accessibility.** The drawing and its labels are `aria-hidden`; the same breakdown is
exposed once as a visually hidden definition list. One clear reading rather than two
overlapping ones.

## Motion

One orchestrated moment — the dimension line. Everything else stays quiet.

```
--duration-micro: 150ms   --duration-base: 240ms
--duration-enter: 400ms   --duration-image: 600ms
--ease-out: cubic-bezier(0.2, 0.7, 0.2, 1)
```

Section entrances are `opacity 0→1` plus `translateY(12px→0)` on an IntersectionObserver at
0.15 threshold, `once: true`, 60ms stagger capped at six items per group. No parallax, no
scroll-jacking, no counters that re-animate, no text that assembles letter by letter.
`@media (prefers-reduced-motion: reduce)` removes every transform and transition globally.

## Breakpoints

| Width      | Behaviour                                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| < 480px    | Navigation drawer is full width. Hero CTAs share a two-column row.                                                                  |
| < 768px    | Sticky action bar (Call · Build a quote · Display). The hero video is never fetched — poster only. Region tabs scroll horizontally. |
| 768–1023px | Drawer becomes a 26rem right-hand panel. The header keeps its _Build a quote_ button.                                               |
| ≥ 1024px   | Full horizontal nav with mega menus, phone number visible.                                                                          |
| ≥ 1200px   | Content container caps at 1200px; full-bleed grids at 1440px.                                                                       |
