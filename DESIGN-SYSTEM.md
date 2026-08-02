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

Built out from the client's brand teal, **`#017580`** — the colour of the DBN mark and of
dbnhomes.com.au. The mark is no longer a foreign object the palette has to work around; it
_is_ the palette. Everything else is a neutral tuned to sit under it: a teal-black for
text, primed-concrete paper, a warm limestone counterweight, brick as signal.

| Token               | Value                  | Role                                                                    |
| ------------------- | ---------------------- | ----------------------------------------------------------------------- |
| `--color-ink`       | `#12262A`              | Body text and headings. A teal-black, not pure charcoal.                |
| `--color-teal`      | `#017580`              | **The brand colour, unaltered.** Buttons, links, masthead, closing CTA. |
| `--color-teal-lift` | `#015D66`              | Hover on teal surfaces. Deeper, not lighter — see rule 4.               |
| `--color-teal-deep` | `#06333A`              | Footer, hero letterbox fill. Same hue, chroma pulled back.              |
| `--color-teal-tint` | `#E8F2F3`              | Pale wash: mega-menu picture bay, quiet panels.                         |
| `--color-paper`     | `#F1F4F4`              | Page base — the colour of primed concrete.                              |
| `--color-surface`   | `#FFFFFF`              | Cards, panels, elevated content.                                        |
| `--color-limestone` | `#E6E1D6`              | Warm alternating band, promo panels, floorplan panels.                  |
| `--color-brick`     | `#8E3B2E`              | **Signal only.**                                                        |
| `--color-rule`      | `rgb(18 38 42 / 0.12)` | Hairlines.                                                              |
| `--color-mark`      | `#017580`              | Alias for the logo colour. Now simply the brand teal.                   |

**Discipline rules.**

1. `--color-brick` may occupy no more than about 2% of any viewport. It is reserved for
   availability pills, the land segment of the dimension line, the step numbers in the
   build process, and error states. Buttons are teal, never brick.
2. Never two adjacent sections on the same background: paper → surface → limestone →
   paper. Full-strength teal belongs to the masthead, the closing CTA and the footer only.
3. Borders, not shadows. Default card treatment is `1px solid var(--color-rule)`; the
   border darkens to `--color-rule-strong` on hover. Shadow is for genuinely floating UI.
4. **Teal hovers go down, not up.** `#017580` carries white text at 5.44:1. Lightening it
   drops that under 4.5:1, so every hover on a teal surface deepens instead. This is the
   one place the palette does the opposite of what a lift normally means, and it is
   deliberate.
5. Teal is never set as body-size text on `--color-limestone` (4.18:1). Teal _icons_ on
   limestone are fine — non-text contrast is a 3:1 bar, and there are four of them.

### Measured contrast

| Pair                                  | Ratio     |
| ------------------------------------- | --------- |
| White on `--color-teal`               | 5.44:1 ✓  |
| White on `--color-teal-lift`          | 7.61:1 ✓  |
| White on `--color-teal-deep`          | 13.62:1 ✓ |
| `--color-teal` on white               | 5.44:1 ✓  |
| `--color-teal` on `--color-paper`     | 4.92:1 ✓  |
| `--color-teal` on `--color-teal-tint` | 4.78:1 ✓  |
| `--color-ink` on `--color-paper`      | 14.21:1 ✓ |
| `--color-brick` on white              | 7.46:1 ✓  |

Every text pair the site actually renders clears WCAG 2.1 AA at normal size.

**The logo.** The mark renders exactly as supplied on light surfaces, and is reversed to
monochrome white (`filter: brightness(0) invert(1)`) on the teal masthead and the footer.
It no longer sits outside the palette — the palette was rebuilt around it.

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
- **One container: `--container-content` 1360px.** Header, every homepage band, the mega
  menu and the footer all sit on it. A section that needs to escape goes full-bleed
  (`width="bleed"`); there is no intermediate width, because a second container is what
  made the page change width at the footer.
- 12 columns, and asymmetric splits (7/5, 8/4) are preferred over 6/6. Symmetry is what
  makes a page read as a template.
- Radii: `--radius-sm` 2px, `--radius-md` 4px (default), `--radius-lg` 8px. Nothing
  rounder — large radii read as SaaS, this is architecture.

## Components

**Buttons** — one component, three variants, two tones (`light` on pale surfaces, `dark`
on teal and over the hero scrim).

| Variant   | Spec                                                                                                     |
| --------- | -------------------------------------------------------------------------------------------------------- |
| Primary   | Forest fill, white text, 4px radius, 52px tall (48px on mobile). Hover lifts 1px to `--color-teal-lift`. |
| Secondary | Transparent with a 1px ink border. Hover inverts to an ink fill.                                         |
| Tertiary  | Ink text, underline at 4px offset, trailing arrow that shifts 3px on hover.                              |

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
hold their true 12px rather than scaling with the drawing. Strokes are `--color-teal` at
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
| ≥ 1360px   | Content container caps at 1360px. Nothing sits on a wider container.                                                                |

## The mega menu

Two bays, modelled on carlislehomes.com.au.

**Left — link columns.** Two or three, separated by hairlines, each heading on its own
rule. Aligned to the 1200px container: the panel carries
`padding-left: max(gutter, (100% - container) / 2)`. That declaration has to sit on the
full-width panel, not on the grid item, because a percentage padding resolves against the
element's own containing block — on a grid item that is the track, not the bar.

**Right — one picture.** A tinted bay (`--color-teal-tint`) that runs off the right edge of
the viewport while the columns stay on the grid, which is what stops the panel reading as a
floating card. Inside it: a 16:9 image, the promo heading, the data-derived line, and the
CTA. The whole card is one anchor — one tab stop, one hit target.

The picture bay is `clamp(19rem, 27vw, 26rem)`, so the three-column _House & land_ panel
still has room at 1024px.

**Below 1024px** the same card appears in the drawer accordion, stacked: image, heading,
body, CTA. It sits inside a collapsed panel, so the lazy image is not fetched until the
visitor opens that section.

**Open state.** The bar item carries a 2px rule under its label. The chevron rotates 180°;
one icon rotated, never two swapped, so it ports to Elementor's nav widget.
