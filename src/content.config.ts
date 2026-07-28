import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { file } from 'astro/loaders';

/**
 * Content collections map 1:1 onto the WordPress custom post types this
 * prototype becomes. The schemas are deliberately strict — a bad record
 * should fail the build, not reach the page.
 *
 * Every record carries `verified`. `true` means the value is confirmed from a
 * public source; `false` means it is a plausible placeholder that must be
 * confirmed with the client before launch (tracked in DATA-VERIFICATION.md).
 */

const verifiable = { verified: z.boolean() };

const tiers = defineCollection({
  loader: file('src/data/tiers.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    tagline: z.string(),
    priceFrom: z.number().int().positive(),
    priceFromLabel: z.string(),
    priceFromSubLabel: z.string(),
    summary: z.string(),
    inheritsFrom: z.string().optional(),
    inclusions: z.array(z.string()).min(4),
    cta: z.object({ label: z.string(), href: z.string() }),
    ...verifiable,
  }),
});

const designs = defineCollection({
  loader: file('src/data/designs.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    series: z.enum(['Tennyson', 'Ofarell', 'Corella', 'Avenue', 'Highbury']),
    frontage: z.number().positive(),
    squares: z.number().positive(),
    areaM2: z.number().positive(),
    houseWidthM: z.number().positive().nullable(),
    houseDepthM: z.number().positive().nullable(),
    minBlock: z.string().nullable(),
    bedrooms: z.number().int().min(1),
    bathrooms: z.number().int().min(1),
    cars: z.number().int().min(1),
    storeys: z.literal(1),
    facadeCount: z.number().int().min(1),
    priceFrom: z.number().int().positive().nullable(),
    image: z.string(),
    imageAlt: z.string(),
    imageIsPlaceholder: z.boolean(),
    ...verifiable,
  }),
});

const regions = defineCollection({
  loader: file('src/data/regions.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    /** Display order. Collections load alphabetically, which is not the order
        a buyer should meet the regions in. */
    order: z.number().int(),
    blurb: z.string(),
    suburbs: z.array(z.object({ name: z.string(), postcode: z.string() })).min(1),
    ...verifiable,
  }),
});

const estates = defineCollection({
  loader: file('src/data/estates.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    suburb: z.string(),
    postcode: z.string(),
    region: z.string(),
    ...verifiable,
  }),
});

const packages = defineCollection({
  loader: file('src/data/packages.json'),
  schema: z.object({
    id: z.string(),
    lot: z.string(),
    street: z.string().nullable(),
    estate: z.string().nullable(),
    suburb: z.string(),
    postcode: z.string(),
    region: z.string(),
    design: z.string(),
    bedrooms: z.number().int().min(1),
    bathrooms: z.number().int().min(1),
    cars: z.number().int().min(1),
    landSizeM2: z.number().positive(),
    frontageM: z.number().positive(),
    floorAreaM2: z.number().positive(),
    priceSmartSpecs: z.number().int().positive().nullable(),
    priceLuxeTurnkey: z.number().int().positive(),
    landPrice: z.number().int().positive().nullable(),
    availability: z.enum(['titled', 'title-anticipated']),
    titleDate: z.string().nullable(),
    image: z.string(),
    imageAlt: z.string(),
    imageIsPlaceholder: z.boolean(),
    ...verifiable,
  }),
});

const reviews = defineCollection({
  loader: file('src/data/reviews.json'),
  schema: z.object({
    id: z.string(),
    quote: z.string(),
    author: z.string(),
    context: z.string(),
    source: z.string(),
    order: z.number().int(),
    condensed: z.boolean(),
    /**
     * Defaults to false on every record until the client authorises
     * publication. AggregateRating schema is withheld unless every rendered
     * review is approved.
     */
    publishApproved: z.boolean(),
    ...verifiable,
  }),
});

export const collections = { tiers, designs, regions, estates, packages, reviews };
