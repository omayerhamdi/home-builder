/**
 * Builds src/data/packages.json.
 *
 * Seven records are real, taken from public listings, and are written through
 * untouched. The rest are generated — confined to confirmed estates only, so
 * nothing on the page implies a footprint we cannot stand behind.
 *
 * The aggregator listing of "81 packages across 24 suburbs" is not used: the
 * same lot appears there with contradictory homes on it, so those are estate
 * marketing combinations rather than DBN's booked inventory. See
 * DATA-VERIFICATION.md.
 *
 *   node tools/generate-packages.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const designs = JSON.parse(readFileSync(join(root, 'src/data/designs.json'), 'utf8'));
const estates = JSON.parse(readFileSync(join(root, 'src/data/estates.json'), 'utf8'));

/* mulberry32 — deterministic, so the data set is reproducible. */
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
const rand = rng(20260729);

const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (min, max) => min + rand() * (max - min);
const round = (n, to) => Math.round(n / to) * to;

const designById = Object.fromEntries(designs.map((d) => [d.id, d]));
const estateById = Object.fromEntries(estates.map((e) => [e.id, e]));

/* ------------------------------------------------------------------ *
 * Real records. Do not alter these numbers.
 * ------------------------------------------------------------------ */

const verified = [
  {
    id: 'lot-1203-maplewood-melton-south',
    lot: '1203',
    street: 'Kinane Street',
    estate: 'maplewood',
    design: 'corella-22',
    bedrooms: 4,
    bathrooms: 2,
    cars: 2,
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
    design: 'ofarell-20',
    bedrooms: 3,
    bathrooms: 2,
    cars: 2,
    landSizeM2: 350,
    priceSmartSpecs: 592400,
    priceLuxeTurnkey: 655800,
    landPrice: 350000,
    availability: 'title-anticipated',
    titleDate: 'Q2 2026',
  },
  {
    id: 'lot-930-aldo-fraser-rise',
    lot: '930',
    street: null,
    estate: 'aldo',
    design: 'corella-18',
    bedrooms: 4,
    bathrooms: 2,
    cars: 1,
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
    design: 'corella-18',
    bedrooms: 4,
    bathrooms: 2,
    cars: 1,
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
    design: 'corella-22',
    bedrooms: 4,
    bathrooms: 2,
    cars: 2,
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
    design: 'ofarell-16',
    bedrooms: 3,
    bathrooms: 2,
    cars: 2,
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
    design: 'ofarell-17',
    bedrooms: 3,
    bathrooms: 2,
    cars: 2,
    landSizeM2: 320,
    priceSmartSpecs: null,
    priceLuxeTurnkey: 687600,
    landPrice: null,
    availability: 'titled',
    titleDate: null,
  },
];

/* ------------------------------------------------------------------ *
 * Generated records — confirmed estates only.
 * ------------------------------------------------------------------ */

/** [estateId, how many to generate] */
const plan = [
  ['aldo', 2],
  ['society-1056', 2],
  ['botania', 4],
  ['monarch', 3],
  ['maplewood', 2],
  ['riverwalk', 2],
];

const streets = {
  aldo: ['Aldo Boulevard', 'Cassia Way', 'Rosella Street'],
  'society-1056': ['Society Way', 'Fraser Rise Drive', 'Melia Street'],
  botania: ['Botania Boulevard', 'Wetland Rise', 'Grevillea Way'],
  monarch: ['Sinclairs Road', 'Monarch Boulevard', 'Fitzsimons Way'],
  maplewood: ['Kinane Street', 'Maplewood Drive', 'Coburn Road'],
  riverwalk: ['Riverwalk Boulevard', 'Ison Road', 'Bellbridge Drive'],
};

const titles = ['Q3 2026', 'Q4 2026', 'Q1 2027', 'Q2 2027'];

/* Only designs with confirmed dimensions are placed on generated lots. */
const placeable = designs.filter((d) => d.verified);

const generated = [];
const usedLots = new Set(verified.map((v) => `${v.lot}-${v.estate}`));

for (const [estateId, count] of plan) {
  for (let i = 0; i < count; i++) {
    const design = pick(placeable);

    /* Larger homes sit higher inside the band. */
    const sizeBias = (design.squares - 12) / (25 - 12);
    const smart = round(
      between(540000, 540000 + (700000 - 540000) * (0.25 + sizeBias * 0.75)),
      100,
    );
    const total = smart + round(between(50000, 65000), 100);
    const landPrice = round(smart * between(0.52, 0.62), 500);

    let lot;
    do {
      lot = String(Math.floor(between(101, 4999)));
    } while (usedLots.has(`${lot}-${estateId}`));
    usedLots.add(`${lot}-${estateId}`);

    const titled = rand() < 0.2;
    const landSize = round(Math.max(design.frontage * 24, between(280, 450)), 1);

    generated.push({
      id: `lot-${lot}-${estateId}`,
      lot,
      street: pick(streets[estateId]),
      estate: estateId,
      design: design.id,
      bedrooms: design.bedrooms,
      bathrooms: design.bathrooms,
      cars: design.cars,
      landSizeM2: landSize,
      priceSmartSpecs: smart,
      priceLuxeTurnkey: total,
      landPrice,
      availability: titled ? 'titled' : 'title-anticipated',
      titleDate: titled ? null : pick(titles),
    });
  }
}

/* ------------------------------------------------------------------ *
 * Fill out both sets with the fields the schema requires.
 * ------------------------------------------------------------------ */

const complete = [...verified, ...generated].map((record) => {
  const design = designById[record.design];
  const estate = estateById[record.estate];
  const isVerified = verified.includes(record);
  return {
    id: record.id,
    lot: record.lot,
    street: record.street,
    estate: record.estate,
    suburb: estate.suburb,
    postcode: estate.postcode,
    design: record.design,
    bedrooms: record.bedrooms,
    bathrooms: record.bathrooms,
    cars: record.cars,
    landSizeM2: record.landSizeM2,
    frontageM: design.frontage,
    floorAreaM2: design.areaM2,
    priceSmartSpecs: record.priceSmartSpecs,
    priceLuxeTurnkey: record.priceLuxeTurnkey,
    landPrice: record.landPrice,
    availability: record.availability,
    titleDate: record.titleDate,
    image: design.image,
    imageAlt: `${design.name} at ${estate.name} — ${design.imageAlt.replace(/^The .*? façade — /, '')}`,
    imageIsPlaceholder: design.imageIsPlaceholder,
    verified: isVerified,
  };
});

writeFileSync(
  join(root, 'src/data/packages.json'),
  `${JSON.stringify(complete, null, 2)}\n`,
);

const from = Math.min(...complete.map((p) => p.priceSmartSpecs ?? p.priceLuxeTurnkey));
const under = complete.filter(
  (p) => (p.priceSmartSpecs ?? p.priceLuxeTurnkey) <= 600000,
).length;

console.log(
  `${complete.length} packages · ${verified.length} verified · from $${from.toLocaleString('en-AU')} · ${under} at or under $600,000`,
);
for (const estate of estates) {
  const n = complete.filter((p) => p.estate === estate.id).length;
  if (n) console.log(`  ${estate.name}: ${n}`);
}
