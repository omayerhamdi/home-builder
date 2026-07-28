/**
 * Builds src/data/packages.json.
 *
 * Eleven records are real, taken from public listings, and are written through
 * untouched. The remaining seventy are generated so that the inventory totals,
 * the region counts and the "from" price on the site are all truthful against
 * the real 81-package footprint — every one of them carries `verified: false`
 * and is listed in DATA-VERIFICATION.md.
 *
 * The generator is deterministic (fixed seed) so the data set is reproducible
 * and diffs stay readable.
 *
 *   node tools/generate-packages.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const designs = JSON.parse(readFileSync(join(root, 'src/data/designs.json'), 'utf8'));
const estates = JSON.parse(readFileSync(join(root, 'src/data/estates.json'), 'utf8'));

/* mulberry32 — small, deterministic, good enough for placeholder data. */
function rng(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(20260728);

const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (min, max) => min + rand() * (max - min);
const round = (n, to) => Math.round(n / to) * to;

const designById = Object.fromEntries(designs.map((d) => [d.id, d]));
const estateById = Object.fromEntries(estates.map((e) => [e.id, e]));

/* ------------------------------------------------------------------ *
 * Real records — sourced from public listings. Do not alter numbers.
 * ------------------------------------------------------------------ */

const verified = [
  {
    id: 'lot-1203-maplewood-melton-south',
    lot: '1203',
    street: 'Kinane Street',
    estate: 'maplewood',
    suburb: 'Melton South',
    postcode: '3338',
    region: 'melbourne-west',
    design: 'corella-22',
    landSizeM2: 400,
    priceSmartSpecs: 592400,
    priceLuxeTurnkey: 655800,
    landPrice: 350000,
    availability: 'title-anticipated',
    titleDate: 'Q2 2026',
  },
  {
    id: 'lot-1007-aldo-fraser-rise',
    lot: '1007',
    street: null,
    estate: 'aldo',
    suburb: 'Fraser Rise',
    postcode: '3336',
    region: 'melbourne-west',
    design: 'ofarell-20',
    landSizeM2: 350,
    priceSmartSpecs: null,
    priceLuxeTurnkey: 658900,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-930-aldo-fraser-rise',
    lot: '930',
    street: null,
    estate: 'aldo',
    suburb: 'Fraser Rise',
    postcode: '3336',
    region: 'melbourne-west',
    design: 'corella-18',
    landSizeM2: 350,
    priceSmartSpecs: 536500,
    priceLuxeTurnkey: 593800,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-441-monarch-deanside',
    lot: '441',
    street: null,
    estate: 'monarch',
    suburb: 'Deanside',
    postcode: '3336',
    region: 'melbourne-west',
    design: 'corella-18',
    landSizeM2: 392,
    priceSmartSpecs: null,
    priceLuxeTurnkey: 657500,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-4257-riverwalk-werribee',
    lot: '4257',
    street: null,
    estate: 'riverwalk',
    suburb: 'Werribee',
    postcode: '3030',
    region: 'melbourne-west',
    design: 'corella-22',
    landSizeM2: 392,
    priceSmartSpecs: null,
    priceLuxeTurnkey: 636500,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-336-society-1056-fraser-rise',
    lot: '336',
    street: null,
    estate: 'society-1056',
    suburb: 'Fraser Rise',
    postcode: '3336',
    region: 'melbourne-west',
    design: 'ofarell-16',
    landSizeM2: 320,
    priceSmartSpecs: null,
    priceLuxeTurnkey: 634700,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-334-society-1056-fraser-rise',
    lot: '334',
    street: null,
    estate: 'society-1056',
    suburb: 'Fraser Rise',
    postcode: '3336',
    region: 'melbourne-west',
    design: 'ofarell-17',
    landSizeM2: 320,
    priceSmartSpecs: null,
    priceLuxeTurnkey: 687600,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-1216-vespa-grange-smythes-creek-a',
    lot: '1216',
    street: 'Vespa Grange',
    estate: 'vespa-grange',
    suburb: 'Smythes Creek',
    postcode: '3351',
    region: 'ballarat',
    design: 'tennyson-12',
    landSizeM2: 336,
    floorAreaM2: 116.3,
    bedrooms: 3,
    bathrooms: 2,
    cars: 1,
    priceSmartSpecs: 524105,
    priceLuxeTurnkey: 581000,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-1218-invicta-drive-smythes-creek-a',
    lot: '1218',
    street: 'Invicta Drive',
    estate: 'invicta-drive',
    suburb: 'Smythes Creek',
    postcode: '3351',
    region: 'ballarat',
    design: 'ofarell-16',
    landSizeM2: 362,
    floorAreaM2: 154.81,
    bedrooms: 4,
    bathrooms: 2,
    cars: 2,
    priceSmartSpecs: 549500,
    priceLuxeTurnkey: 606400,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-1218-invicta-drive-smythes-creek-b',
    lot: '1218',
    street: 'Invicta Drive',
    estate: 'invicta-drive',
    suburb: 'Smythes Creek',
    postcode: '3351',
    region: 'ballarat',
    design: 'tennyson-15',
    landSizeM2: 362,
    floorAreaM2: 136.43,
    bedrooms: 3,
    bathrooms: 3,
    cars: 1,
    priceSmartSpecs: 557970,
    priceLuxeTurnkey: 614900,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
  {
    id: 'lot-1216-vespa-grange-smythes-creek-b',
    lot: '1216',
    street: 'Vespa Grange',
    estate: 'vespa-grange',
    suburb: 'Smythes Creek',
    postcode: '3351',
    region: 'ballarat',
    design: 'ofarell-16',
    landSizeM2: 336,
    floorAreaM2: 167.22,
    bedrooms: 4,
    bathrooms: 2,
    cars: 2,
    priceSmartSpecs: 559630,
    priceLuxeTurnkey: 616500,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
];

/* ------------------------------------------------------------------ *
 * Generated records — real suburb distribution, plausible numbers.
 * ------------------------------------------------------------------ */

/** [suburb, postcode, region, count, estateId|null] */
const plan = [
  ['Mambourin', '3024', 'melbourne-west', 5, null],
  ['Werribee', '3030', 'melbourne-west', 2, 'riverwalk'],
  ['Truganina', '3029', 'melbourne-west', 3, null],
  ['Deanside', '3336', 'melbourne-west', 1, 'monarch'],
  ['Tarneit', '3029', 'melbourne-west', 2, null],
  ['Wyndham Vale', '3024', 'melbourne-west', 2, null],
  ['Weir Views', '3338', 'melbourne-west', 2, null],
  ['Strathtulloh', '3338', 'melbourne-west', 2, null],
  ['Beveridge', '3753', 'melbourne-north', 5, null],
  ['Wallan', '3756', 'melbourne-north', 4, null],
  ['Diggers Rest', '3427', 'melbourne-north', 2, null],
  ['Donnybrook', '3064', 'melbourne-north', 1, null],
  ['Junction Village', '3977', 'melbourne-south-east', 3, null],
  ['Clyde North', '3978', 'melbourne-south-east', 2, null],
  ['Pakenham', '3810', 'melbourne-south-east', 1, null],
  ['Armstrong Creek', '3217', 'geelong', 6, null],
  ['Lara', '3212', 'geelong', 4, null],
  ['Sebastopol', '3356', 'ballarat', 10, 'dream-ballarat'],
  ['Smythes Creek', '3351', 'ballarat', 4, 'vespa-grange'],
  ['Winter Valley', '3358', 'ballarat', 3, null],
  ['Longwarry', '3816', 'gippsland', 4, null],
  ['Drouin', '3818', 'gippsland', 1, null],
  ['Warragul', '3820', 'gippsland', 1, null],
];

/**
 * Regional bands for the SmartSpecs figure — the headline "from" price.
 * The floor sits just above the real cheapest package ($524,105 at Smythes
 * Creek) so that the site's "from" price stays the verified one.
 */
const band = {
  'melbourne-west': [610000, 730000],
  'melbourne-south-east': [608000, 720000],
  'melbourne-north': [588000, 692000],
  geelong: [592000, 700000],
  ballarat: [540000, 640000],
  gippsland: [535000, 625000],
};

/* Only designs with confirmed dimensions are placed on generated lots. */
const placeable = designs.filter((d) => d.verified);

const streets = {
  Mambourin: ['Ambition Way', 'Highlands Boulevard', 'Marigold Crescent'],
  Werribee: ['Riverwalk Boulevard', 'Ison Road', 'Bellbridge Drive'],
  Truganina: ['Elderberry Drive', 'Sayers Road', 'Skyline Way'],
  Deanside: ['Sinclairs Road', 'Fitzsimons Way', 'Monarch Boulevard'],
  Tarneit: ['Leakes Road', 'Baileyana Street', 'Kingsford Drive'],
  'Wyndham Vale': ['Ballan Road', 'Manor Lakes Boulevard', 'Greens Road'],
  'Weir Views': ['Ferris Road', 'Bridge Road', 'Toolern Street'],
  Strathtulloh: ['Coburn Road', 'Grices Road', 'Exford Road'],
  Beveridge: ['Mandalay Circuit', 'Lithgow Street', 'Patterson Drive'],
  Wallan: ['Windham Street', 'Northern Highway', 'Hadfield Park Drive'],
  'Diggers Rest': ['Plumpton Road', 'Bellevue Drive', 'Watsons Road'],
  Donnybrook: ['Olivine Boulevard', 'Donnybrook Road', 'Cloverton Drive'],
  'Junction Village': ['Baxter-Tooradin Road', 'Grasmere Street', 'Ballarto Road'],
  'Clyde North': ['Berwick-Cranbourne Road', 'Smiths Lane', 'Casey Fields Boulevard'],
  Pakenham: ['Wattletree Road', 'Cardinia Road', 'Henry Road'],
  'Armstrong Creek': ['Warralily Boulevard', 'Unity Drive', 'Horseshoe Bend Road'],
  Lara: ['Kees Road', 'Windermere Road', 'Canterbury Road'],
  Sebastopol: ['Dream Court', 'Whitelaw Avenue', 'Rubicon Street'],
  'Smythes Creek': ['Vespa Grange', 'Invicta Drive', 'Ballarat-Colac Road'],
  'Winter Valley': ['Ballarat Links Drive', 'Wildflower Drive', 'Sunrise Boulevard'],
  Longwarry: ['Bennett Street', 'Drouin Road', 'Palmer Street'],
  Drouin: ['Rosedale Court', 'Bellbird Drive', 'Sinclair Street'],
  Warragul: ['Bowen Street', 'Copelands Road', 'Waterford Rise'],
};

const titles = ['Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027'];

const generated = [];
const usedLots = new Set(verified.map((v) => `${v.lot}-${v.suburb}`));

for (const [suburb, postcode, region, count, estateId] of plan) {
  for (let i = 0; i < count; i++) {
    const design = pick(placeable);
    const [lo, hi] = band[region];

    // Larger homes sit higher inside the regional band.
    const sizeBias = (design.squares - 12) / (25 - 12);
    const smart = round(between(lo, lo + (hi - lo) * (0.35 + sizeBias * 0.65)), 100);
    const total = smart + round(between(50000, 65000), 100);
    const landPrice = round(smart * between(0.52, 0.62), 500);

    let lot;
    do {
      lot = String(Math.floor(between(101, 4999)));
    } while (usedLots.has(`${lot}-${suburb}`));
    usedLots.add(`${lot}-${suburb}`);

    const titled = rand() < 0.2;
    const landSize = round(Math.max(design.frontage * 24, between(280, 450)), 1);

    const slugSuburb = suburb.toLowerCase().replace(/[^a-z]+/g, '-');
    generated.push({
      id: `lot-${lot}-${estateId ? `${estateId}-` : ''}${slugSuburb}`,
      lot,
      street: pick(streets[suburb]),
      estate: estateId,
      suburb,
      postcode,
      region,
      design: design.id,
      bedrooms: design.bedrooms,
      bathrooms: design.bathrooms,
      cars: design.cars,
      landSizeM2: landSize,
      frontageM: design.frontage,
      floorAreaM2: design.areaM2,
      priceSmartSpecs: smart,
      priceLuxeTurnkey: total,
      landPrice,
      availability: titled ? 'titled' : 'title-anticipated',
      titleDate: titled ? null : pick(titles),
      image: design.image,
      imageAlt: `${design.name} at ${suburb} — ${design.imageAlt.replace(/^The .*? façade — /, '')}`,
      imageIsPlaceholder: true,
      verified: false,
    });
  }
}

/* Fill out the real records with the fields the schema requires. */
const complete = verified.map((v) => {
  const design = designById[v.design];
  const estate = v.estate ? estateById[v.estate] : null;
  return {
    id: v.id,
    lot: v.lot,
    street: v.street,
    estate: v.estate,
    suburb: v.suburb,
    postcode: v.postcode,
    region: v.region,
    design: v.design,
    bedrooms: v.bedrooms ?? design.bedrooms,
    bathrooms: v.bathrooms ?? design.bathrooms,
    cars: v.cars ?? design.cars,
    landSizeM2: v.landSizeM2,
    frontageM: design.frontage,
    floorAreaM2: v.floorAreaM2 ?? design.areaM2,
    priceSmartSpecs: v.priceSmartSpecs,
    priceLuxeTurnkey: v.priceLuxeTurnkey,
    landPrice: v.landPrice,
    availability: v.availability,
    titleDate: v.titleDate,
    image: design.image,
    imageAlt: `${design.name} at ${estate ? estate.name : v.suburb} — ${design.imageAlt.replace(/^The .*? façade — /, '')}`,
    imageIsPlaceholder: design.imageIsPlaceholder,
    verified: true,
  };
});

const all = [...complete, ...generated];

const fromPrice = Math.min(...all.map((p) => p.priceSmartSpecs ?? p.priceLuxeTurnkey));
const underSix = all.filter(
  (p) => (p.priceSmartSpecs ?? p.priceLuxeTurnkey) <= 600000,
).length;

writeFileSync(join(root, 'src/data/packages.json'), `${JSON.stringify(all, null, 2)}\n`);

console.log(
  `${all.length} packages · ${complete.length} verified · from $${fromPrice.toLocaleString('en-AU')} · ${underSix} at or under $600,000`,
);
for (const region of Object.keys(band)) {
  console.log(`  ${region}: ${all.filter((p) => p.region === region).length}`);
}
