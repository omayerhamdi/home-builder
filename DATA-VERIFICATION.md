# Data verification

Every record in `src/data/` carries a `verified` flag. `true` means the value is confirmed
from a public source. `false` means it is a plausible placeholder that must be confirmed
with the client before launch.

This document is the list to walk with the client in one sitting. It is grouped so each
section can be answered independently.

---

## 1. Questions that change URLs — answer these first

**1.1 "Ofarell" or "Ofarrell"?**
The client's own site spells the series **Ofarrell** (double r). The builder profile that
carries their real floorplans, and the floorplan filenames themselves, spell it
**Ofarell** (single r). One of them is wrong.

This build uses `ofarell-*` because it matches the floorplan assets. Changing it after
launch means another redirect, so it needs answering before slugs are generated.

Affects: `src/data/designs.json` (3 records), `src/data/packages.json` (several), every
design and package URL containing the series.

**1.2 Display home address.**
Two addresses appear across sources: **205 Sinclairs Road, Fraser Rise VIC 3335** and **31
Solstice Drive, Plumpton**. The site currently uses Sinclairs Road, from the Google
Business Profile. Confirm which is current, and whether both exist.

Affects: `src/lib/site.ts`, the display home section, the footer, the `LocalBusiness`
structured data and the directions link.

---

## 2. Home designs — `src/data/designs.json`

Ten of the thirteen designs are fully verified from the client's builder profile, which
carries their real floorplans and dimensions. Three are not.

| Design      | `verified` | What is missing                                                                                                                                           |
| ----------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Avenue 23   | `false`    | Depth × width, bedrooms, bathrooms, cars, façade count. Interpolated from the series pattern: 12.85 × 21.60 m, 4/2/2, 3 façades, minimum block 14m × 27m. |
| Avenue 25   | `false`    | As above. Interpolated: 12.85 × 23.20 m, 4/2/2, 3 façades, minimum block 14m × 29m.                                                                       |
| Highbury 26 | `false`    | As above. Interpolated: 14.85 × 21.90 m, 4/2/2, 3 façades, minimum block 16m × 28m.                                                                       |

Also worth confirming across all thirteen:

- **Façade names per design.** Four real façade renders exist — Modern, Rise, Freedom and
  Fresh — but which façades are offered on which design is not published anywhere. The
  current mapping is an assignment, not a fact.
- **Floor areas** for the Tennyson, Ofarell and Avenue variants are derived from the
  squares figure at 9.290304 m² per square. Only the Corella 22 has a published area
  (22.64 sq / 210.06 m²).
- **No design carries a "from" price.** Design cards show the cheapest real package built
  on that design instead. If the client publishes design-level pricing, that becomes a
  field.

## 3. House & land — `src/data/packages.json`

**11 of 81 records are verified.** They are real, sourced from public listings, and their
numbers are not altered anywhere in the build.

| Lot                | Location                  | Design      | Figures held                                                                        |
| ------------------ | ------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| 1203 Kinane St     | Maplewood, Melton South   | Corella 22  | SmartSpecs $592,400 · LuxeTurnkey $655,800 · land $350,000 · 400 m² · title Q2 2026 |
| 1007               | Aldo, Fraser Rise         | Ofarell 20  | $658,900                                                                            |
| 930                | Aldo, Fraser Rise         | Corella 18  | $536,500 · LuxeTurnkey $593,800                                                     |
| 441                | Monarch, Deanside         | Corella 18  | $657,500                                                                            |
| 4257               | Riverwalk, Werribee       | Corella 22  | $636,500                                                                            |
| 336                | Society 1056, Fraser Rise | Ofarell 16  | $634,700                                                                            |
| 334                | Society 1056, Fraser Rise | Ofarell 17  | $687,600                                                                            |
| 1216 Vespa Grange  | Smythes Creek             | Tennyson 12 | $524,105 · 3/2/1 · 116.30 m² · 336 m²                                               |
| 1218 Invicta Drive | Smythes Creek             | Ofarell 16  | $549,500 · 4/2/2 · 154.81 m² · 362 m²                                               |
| 1218 Invicta Drive | Smythes Creek             | Tennyson 15 | $557,970 · 3/3/1 · 136.43 m² · 362 m²                                               |
| 1216 Vespa Grange  | Smythes Creek             | Ofarell 16  | $559,630 · 4/2/2 · 167.22 m² · 336 m²                                               |

**The remaining 70 records are generated and carry `verified: false`.** They exist so the
region counts, the suburb spread and the "from" price on the page are truthful against the
real 81-package footprint. They are produced deterministically by
`tools/generate-packages.mjs` under these constraints:

- Real suburb distribution and real regional totals (West 26 · Ballarat 21 · North 12 ·
  Geelong 10 · South East 6 · Gippsland 6).
- SmartSpecs price inside a regional band; Ballarat and Gippsland skew low, Melbourne West
  and South East skew high. LuxeTurnkey sits $50,000–$65,000 above SmartSpecs.
- Land price 52–62% of the SmartSpecs figure.
- Only designs with confirmed dimensions are placed, and only where the frontage fits.
- Land size 280–450 m²; titles between Q3 2026 and Q2 2027, roughly a fifth titled now.
- No generated price falls below the real cheapest package, so the site's "from $524,105"
  stays the verified figure.

**These must all be replaced with the real inventory before launch.** Nothing about the
generated set should be quoted to a buyer.

Also to confirm:

- **Where the inventory comes from.** Is there a spreadsheet, or a portal feed? That
  answer decides whether the production build needs an importer or manual entry.
- **Estate names** for the 19 suburbs with live packages but no confirmed estate name:
  Mambourin · Truganina · Tarneit · Wyndham Vale · Weir Views · Strathtulloh · Beveridge ·
  Wallan · Diggers Rest · Donnybrook · Junction Village · Clyde North · Pakenham ·
  Armstrong Creek · Lara · Winter Valley · Longwarry · Drouin · Warragul. The UI already
  handles a package with no estate line, so this is an improvement rather than a blocker.

## 4. Reviews — `src/data/reviews.json`

Every record carries `publishApproved: false`. They render on the page — the flag exists so
the question is on the checklist, not to block the prototype — but two things are needed:

1. **Exact wording.** The three Google reviews are condensed. They are labelled as condensed
   on the page and must not be presented as verbatim until the original text is confirmed.
2. **Written permission** to quote reviewers and to publish the 4.8★ / 25 rating.

Until permission is given, `AggregateRating` structured data is deliberately **not**
emitted, even though the rating is real. The two named reviews (Mel & Luke, Mervyn L.) are
already published on the client's own site, so they are the safer pair to lead with.

## 5. Figures used as fact on the homepage

| Figure                                                                | Source                         | Confirm?                                              |
| --------------------------------------------------------------------- | ------------------------------ | ----------------------------------------------------- |
| ABN 51 628 368 052                                                    | Site footer and brochure       | No                                                    |
| Registered Building Practitioner CDB-U 60416                          | Design page footer             | No                                                    |
| HIA Member                                                            | Footer badge                   | No                                                    |
| 1300 208 191 · info@dbnhomes.com.au                                   | Site and Google                | No                                                    |
| 4.8★ from 25 Google reviews                                           | Google Business Profile        | Permission to publish                                 |
| Open 11:00–17:00, seven days                                          | Google Business Profile        | Address — see 1.2                                     |
| SmartSpecs from $194,500, site cost included                          | Client site                    | Still current?                                        |
| LuxeTurnkey from $593,800                                             | Verified package               | Still current?                                        |
| Price held up to 18 months                                            | Client site                    | Still current?                                        |
| 6-month maintenance period                                            | Client material                | Still current?                                        |
| 7-star energy rating, 3.5kW solar standard                            | Client inclusions              | Still current?                                        |
| Fixed site cost to 400mm, M-class waffle-pod slab                     | Client inclusions              | Still current?                                        |
| $10,000 First Home Owner Grant to $750,000; no stamp duty to $600,000 | Victorian State Revenue Office | Re-check at launch — thresholds move with each budget |

The names **Shane** and **Billy** appear in the display home copy, taken from published
reviews. Confirm both are still with the business and are comfortable being named.
