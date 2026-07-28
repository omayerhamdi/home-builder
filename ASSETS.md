# Assets

Every image and video in this repository is downloaded, processed by `astro:assets` and
recorded here. Nothing is hotlinked.

Two things are always the client's real assets and are never substituted: **the logo** and
**floorplans**. Both are checkable, and a wrong one is noticeable.

---

## Client swap list

These surfaces currently carry a licensed or generated substitute because no client asset
exists for them yet. This is the list to send the moment the client's photo library is
available — swapping any row is a one-file replacement, no code change.

**Homepage — home designs section**

| Design      | Needs                                        |
| ----------- | -------------------------------------------- |
| Tennyson 12 | Façade render, 8.5m frontage, single garage  |
| Tennyson 15 | Façade render, 8.5m frontage, single garage  |
| Ofarell 17  | Façade render, 10.5m frontage, double garage |
| Ofarell 20  | Façade render, 10.5m frontage, double garage |
| Corella 20  | Façade render, 12.5m frontage, double garage |
| Corella 25  | Façade render, 12.5m frontage, double garage |
| Avenue 23   | Façade render, 14m frontage                  |
| Avenue 25   | Façade render, 14m frontage                  |
| Highbury 26 | Façade render, 16m frontage                  |

Real renders already in place: **Modern**, **Rise**, **Freedom** and **Fresh** — currently
mapped to Corella 22, Ofarell 16, Tennyson 17 and Corella 18. If the client can confirm
which façade belongs to which design, the mapping should be corrected.

**Homepage — house & land section**

Package cards reuse the façade image of their design. Per-package photography would replace
these one for one.

**Homepage — display home section**

| Surface               | Needs                                                                            |
| --------------------- | -------------------------------------------------------------------------------- |
| Display home exterior | A dusk photograph of the Sinclairs Road display with the interior lights on, 3:2 |

Also worth requesting, though nothing is blocked on them: a floorplan image for each of
the thirteen designs (only Corella 25 is held here), and the standard inclusions PDF.

---

## Register

### Client assets — used as supplied

| Path                                              | Source                          | Where used                      | Alt text                                                                                                     |
| ------------------------------------------------- | ------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `src/assets/img/brand/dbn-homes-logo.png`         | Client brand file               | Header, drawer, footer          | `DBN Homes`                                                                                                  |
| `src/assets/img/designs/facade-modern.jpg`        | Client façade render            | Corella 22 card; package cards  | The Modern façade on the Corella 22 — rendered feature wall, timber-look garage door and grey brickwork      |
| `src/assets/img/designs/facade-rise.jpg`          | Client façade render            | Ofarell 16 card; package cards  | The Rise façade — double garage, white render and a low charcoal roof set behind native landscaping          |
| `src/assets/img/designs/facade-freedom.jpg`       | Client façade render            | Tennyson 17 card; package cards | The Freedom façade — single garage, brick and render mix with a recessed entry under a dark tiled roof       |
| `src/assets/img/designs/facade-fresh.jpg`         | Client façade render            | Corella 18 card; package cards  | The Fresh façade — double garage in dark brick with a full-height living room window and a charcoal roof     |
| `src/assets/img/designs/floorplan-corella-25.png` | Client floorplan                | Held for the single design page | Corella 25 floorplan                                                                                         |
| `src/assets/img/interiors/kitchen-island.jpg`     | Client display-home photography | LuxeTurnkey tier card           | Kitchen and island bench in a LuxeTurnkey home — dark overhead cabinetry, 900mm cooktop and canopy rangehood |
| `src/assets/img/interiors/kitchen-galley.jpg`     | Client display-home photography | SmartSpecs tier card            | Galley kitchen in a SmartSpecs home — stone benchtops, stainless appliances and timber-look flooring         |
| `src/assets/img/interiors/kitchen-pantry.jpg`     | Client display-home photography | Certainty section, 4:5          | Kitchen in a completed DBN home — stone benchtop, 900mm upright oven, canopy rangehood and a walk-in pantry  |
| `src/assets/img/interiors/bedroom.jpg`            | Client display-home photography | Held for later pages            | —                                                                                                            |
| `src/assets/img/interiors/study-nook.jpg`         | Client display-home photography | Held for later pages            | —                                                                                                            |
| `src/assets/img/interiors/selection-studio.jpg`   | Client display-home photography | Held for later pages            | —                                                                                                            |

### Frames pulled from the client's own display-home film

The client supplied a 31-second display-home and estate film. It is the strongest real
material available: an aerial pass over a live growth-corridor estate, with slabs and
frames alongside finished homes. Nobody else in this segment shows the build stage.

| Path                                              | Where used                          | Alt text                                                                                                                                     |
| ------------------------------------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/video/dbn-display-home.mp4` / `.webm`     | Hero, above 768px only              | — (decorative, `aria-hidden`)                                                                                                                |
| `src/assets/img/hero/hero-poster.jpg`             | Hero poster, 16:9 — the LCP element | A completed DBN home on its lot in a Melbourne growth-corridor estate, seen from the air with the driveway, fencing and landscaping finished |
| `src/assets/img/hero/hero-poster-mobile.jpg`      | Hero poster, 4:5 mobile crop        | as above                                                                                                                                     |
| `src/assets/img/estates/estate-aerial-frames.jpg` | Where we build, 16:9                | Aerial view of a Melbourne growth-corridor estate — completed DBN homes alongside slabs and frames on the next release                       |
| `src/assets/img/estates/home-on-lot-aerial.jpg`   | Held for later pages                | —                                                                                                                                            |
| `src/assets/img/interiors/living-dining.jpg`      | Held for later pages                | —                                                                                                                                            |
| `public/og/home.jpg`                              | `og:image`, 1200×630                | —                                                                                                                                            |

The video segment is 10 seconds from 9.0s, encoded to 1280×720 H.264 (1.2 MB) plus VP9
WebM (1.9 MB), **with no audio track at all**. The poster is a frame from the same
timestamp, so the still and the first frame of the video match exactly.

### Substituted assets — `placeholder: true`

Generated under a licensed Freepik/Magnific subscription, chosen as one coherent set:
eye-level street view, charcoal roof, timber paling fences, native landscaping, bright
overcast daylight, cool neutral white balance — matched to the client's own renders so the
grid reads as one shoot.

| Path                                           | Stands in for                 | Frontage |
| ---------------------------------------------- | ----------------------------- | -------- |
| `src/assets/img/designs/facade-narrow-a.jpg`   | Tennyson 12                   | 8.5m     |
| `src/assets/img/designs/facade-narrow-b.jpg`   | Tennyson 15                   | 8.5m     |
| `src/assets/img/designs/facade-mid-a.jpg`      | Ofarell 17                    | 10.5m    |
| `src/assets/img/designs/facade-mid-b.jpg`      | Ofarell 20                    | 10.5m    |
| `src/assets/img/designs/facade-standard-a.jpg` | Corella 20                    | 12.5m    |
| `src/assets/img/designs/facade-standard-b.jpg` | Corella 25                    | 12.5m    |
| `src/assets/img/designs/facade-wide-a.jpg`     | Avenue 23                     | 14m      |
| `src/assets/img/designs/facade-wide-b.jpg`     | Avenue 25                     | 14m      |
| `src/assets/img/designs/facade-xwide-a.jpg`    | Highbury 26                   | 16m      |
| `src/assets/img/estates/display-home-dusk.jpg` | Display home exterior at dusk | —        |

Each carries `imageIsPlaceholder: true` on its record in `src/data/designs.json`, so the
swap list above is generated from the data rather than maintained by hand.

### Deliberately absent

**Review portraits.** The reviews section uses typographic initials, not stock headshots.
On a page whose entire argument is trust, an invented face is the one substitution that
costs more than it gains.

---

## Processing

- Every image runs through `astro:assets`: AVIF primary with a WebP fallback, emitted at
  the widths each surface actually uses. Nothing ships a 2400px file to a 400px slot.
- `loading="lazy"` and `decoding="async"` everywhere except the hero poster, which is
  `loading="eager"` with `fetchpriority="high"` — it is the LCP element by design, so the
  video can never become it.
- Every image has an explicit aspect ratio. CLS target is zero.
- Budgets: any single image ≤ 250 KB, hero poster ≤ 180 KB (largest AVIF is 152 KB), video
  ≤ 3 MB.
- Alt text is written per image and describes what is in the frame. No filenames, no
  keyword stuffing. Decorative images take `alt=""` or `aria-hidden`.
