# Decisions

One line of reasoning per decision, in the order they were made. Where an ambiguity came
up, the option that was easier to rebuild in Elementor and more honest about price won.

---

**The aggregator's 81 packages, 24 suburbs and 6 regions are not published.**
The listing could not be confirmed as DBN's own inventory, and it contradicts itself — the
same lot appears twice with different homes on it. The inventory is now built from the
verified records plus generated ones confined to confirmed estates, and every count on the
page is derived from that data at build time. The site says less and means all of it.

**The homepage is composed twice, not once.**
Below 768px the film and the words are separated: a media block, then a solid teal panel
carrying the headline. Type never sits over moving video on a phone, so contrast is fixed
rather than fighting a scrim that changes brightness every frame. From 768px up the film
goes full-bleed behind a three-layer scrim.

**The package finder was lifted out of the hero into its own band.**
The hero already carries a claim, a sentence and two buttons. A four-field form on top of
that is one job too many for a single screen. On its own limestone band it gets a real
label and a live count, and becomes the seam between the promise and the proof.

**"Where we build" is a drawn locality plan, not an embedded map.**
Pins are projected from the estates' real coordinates and the arcs are true distance rings
from the CBD, so the map answers the question a buyer actually asks. Inline SVG means no
map provider, no API key, no third-party script, and it inherits the palette. Pins are per
suburb rather than per estate — three of these estates sit within a kilometre of each
other and would otherwise collide into an unreadable knot.

**First home buyer eligibility is plotted, not described.**
One axis, the two thresholds shaded on it, every package in the inventory drawn as a tick.
It is the dimension line's language applied to eligibility, and it answers in one glance
where the range sits relative to $600,000 and $750,000.

**Reviews are a native scroll-snap carousel.**
The rail is a real scroll container, so a trackpad, a swipe, the keyboard and the scrollbar
all work before any script runs; the buttons, counter and progress bar are enhancement on
top. The next card is left peeking, which is what tells a visitor there is more.

**The disclosure indicator is two icons, not one rotated.**
Opening and closing read as different states rather than the same glyph tipped over, and
the pair sits in a well that fills on hover so the trigger has a real target.

**The closing CTA sits on photography, the footer stays flat.**
Two adjacent dark bands of the same flat colour read as one long slab. Putting the CTA on a
deep teal wash over a real DBN home separates them and gives the last screen before the
small print something to look at.

**Astro at its current major, not the version named in the original spec.**
Same reasons hold — zero framework JavaScript, Content Collections, static output — and
starting a new build on an older major would mean an upgrade before launch.

**Zod imported from the `zod` package rather than re-exported from `astro:content`.**
The re-export is deprecated in the current Astro major. One extra production dependency,
no behaviour change, and it keeps `astro check` at zero hints.

**Tailwind v4 `@theme` tokens, no config file.**
The tokens compile to plain CSS custom properties, which is exactly what transfers to
Elementor Global Colours and Global Fonts. A JS config would not transfer.

**The logo is never repainted; the reversed version is a CSS filter, not a second file.**
The client's mark is teal, which sits outside the palette. On light surfaces it renders as
supplied. On dark bands `filter: brightness(0) invert(1)` produces the reversed monochrome
version — one asset, no extra request, and the mark itself is untouched.

**The dimension line shows three segments, not six.**
The brief asks for land, build, site costs, landscaping, fencing and driveway as separate
dimensioned segments. Only three of those figures can be derived from public data: land
($350,000), the SmartSpecs build ($242,400) and the LuxeTurnkey difference ($63,400), all
falling out of two advertised prices. Splitting further would mean inventing numbers inside
the one graphic whose entire argument is that the numbers are real. The segment labels name
what sits inside each.

**The dimension line's visuals are `aria-hidden`; the breakdown is exposed once as a
definition list.**
The spec asks for both an `aria-label` on the SVG and a visually hidden definition list.
Doing both literally means a screen reader hears the breakdown twice, and `role="img"`
would hide the list from assistive technology anyway. One clear reading was chosen over two
overlapping ones.

**Progressive-enhancement styles are gated behind `html.js`.**
The dimension-line draw and the section entrance animations start from a hidden state. That
state is only applied when a class set before first paint says scripting is available, so
with JavaScript off the page renders complete rather than blank.

**The hero poster is the LCP element, and the video is layered over it.**
The video is fetched only above 768px, only when motion is allowed, and only on idle. Below
768px it is never requested at all — several megabytes saved on exactly the connection
where it matters. The poster is a frame from the same timestamp as the video's first frame,
so there is no visible swap.

**Hero video: 10 seconds at 1280×720, no audio track.**
The supplied film is 31 seconds and 30 MB. The segment chosen is the aerial pass over a
live estate — slabs and frames beside finished homes — because it is the one piece of
imagery in the whole library that argues the certainty case rather than the aspiration one.
H.264 at 1.2 MB with a VP9 WebM alternative, both well inside the 3 MB budget.

**Design cards show "house and land from $X", computed from the cheapest real package on
that design, or the minimum block size where no package exists.**
No design-level pricing is published anywhere, and inventing a "from" figure is exactly the
kind of number this site exists to argue against.

**Package cards only draw the compact dimension line when the land component is published.**
Most verified records list a total but not the land split. Those cards show the price
without a breakdown rather than a split that cannot be defended.

**The build process section was kept, even though the page-structure spec lists eleven
sections and does not include it.**
Full copy for eight steps exists, it answers a real first-home-buyer anxiety, and leaving
written content unused would have been the odd choice. It sits between the first-home-buyer
band and the closing CTA.

**Region tabs default to Melbourne West, though Ballarat is the largest concentration.**
The heading and the page meta lead on Melbourne's west, so opening on another region would
contradict them. Ballarat is given its own emphasis in the "Where we build" section, where
its lead is stated as a fact with the count attached.

**Below 1024px the navigation is a drawer, not a collapsed inline menu.**
Tablets get a 26rem right-hand panel and phones get the full width. The mega-menu columns
become accordions, so the same information architecture holds at every width instead of
being thinned out on small screens.

**The homepage designs grid renders all thirteen designs and shows six.**
Filtering hides rather than fetches, the initial six are chosen server-side so nothing
flashes, and the predicate is a pure function over data attributes — which is the part that
survives the port to a WordPress Loop Grid.

**Every route the homepage links to resolves to a real page.**
Rather than leaving stubs to 404, `[...slug].astro` derives its paths from the navigation
and the data and renders a page that states plainly which stage that section belongs to. A
link cannot be added without a page appearing behind it.

**No `AggregateRating` structured data.**
The 4.8★ / 25 rating is real, but publishing it as schema needs written authorisation.
Every review record carries `publishApproved: false` until then.

**`robots.txt` disallows everything and every page is `noindex`.**
This is a preview build. It must never be indexed alongside the production site. Removing
this is a deliberate later decision, not a default.

**The palette was rebuilt on the client's brand teal, `#017580`.**
The first build derived its colour from Australian residential materials — Colorbond roof
greens, brick, primed concrete — and treated the client's teal mark as something the
palette had to tolerate rather than express. The client asked for their brand colour to be
maintained, and they were right to. The greens are gone; `#017580` is now the primary,
used unaltered on the masthead, the buttons, the links and the closing CTA. Two derivations
carry the weight the single brand value cannot: `--color-teal-deep` (`#06333A`) for the
footer and the hero letterbox, because full-strength teal across a 900px band is a wall of
saturation, and `--color-teal-tint` (`#E8F2F3`) for quiet panels. The token was renamed
`--color-forest` → `--color-teal` throughout rather than left as a green name holding a
teal value.

**Hovers on teal deepen instead of lifting.**
`#017580` carries white text at 5.44:1 — enough for AA at any size, but with no headroom.
Lightening it for hover, which is what the old `--color-forest-lift` did, drops the label
under 4.5:1. Every teal hover therefore goes to `#015D66` (7.61:1). It is the opposite of
what "lift" normally means, so the token comment says why.

**The mega menu carries one picture, not two.**
Modelled on carlislehomes.com.au: link columns on the left, a tinted bay on the right that
bleeds to the viewport edge while the columns stay on the 1200px grid. Carlisle runs two
image cards per panel; this build runs one, because `content.md` sanctions exactly one
promo per menu and a second card would mean inventing copy to fill a layout. The picture
is a real client asset already inventoried in `ASSETS.md` — the menu introduces no new
photography.

**The drawer gets the same picture, and it costs nothing until opened.**
The obvious worry with images in navigation is the phone. Here each card sits inside a
collapsed accordion, so a lazy image is never fetched until the visitor opens that section,
and then only one 16:9 frame at 92vw. The alternative — dropping the images below 1024px —
would have given tablet and phone visitors a visibly poorer menu for no measured saving.

**One container, 1360px, and the second one is deleted.**
The layout had two: `--container-content` at 1200px for everything, and `--container-wide`
at 1440px. The footer was the only consumer of the wider one, so the page visibly changed
width at the last band — and at 1200px the hero sat in a trench on a desktop screen. Both
are now one 1360px container, used by the header, every homepage band, the mega menu and
the footer. `--container-wide` and `Section`'s `width="wide"` variant are gone rather than
left as aliases: a token that means "the other width" is how the inconsistency comes back.
A section that genuinely needs to escape uses `width="bleed"`.

**The hero owns the first screen; the proof strip starts below it.**
`min-height: max(600px, calc(100svh - header))` on the hero grid puts its bottom edge on
the fold exactly, so the four proof items are always the reward for the first scroll rather
than a crowded fifth element competing with the claim. Two things were wrong before: the
grid's bottom padding was subtracted as well as being inside the box (`box-sizing:
border-box` already counts it), and an 840px ceiling meant that on a 1080p screen the hero
stopped 150px short and the strip showed through. The 600px floor stays — on a short laptop
the cells run past the fold rather than being crushed.
