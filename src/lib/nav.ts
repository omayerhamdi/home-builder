import { getCollection } from 'astro:content';
import { formatAud, packageFromPrice } from './format';
import type { NavColumn, NavLink } from './site';

/**
 * The primary navigation, built from the data.
 *
 * Estate names, package counts and the "from" price all come from the
 * collections at build time — no count is ever typed into a menu label. If
 * the inventory changes, the menu changes with it.
 */

export interface NavPromo {
  heading: string;
  body: string;
  cta: NavLink;
}

export interface NavItem {
  label: string;
  href: string;
  panel?: { columns: NavColumn[]; promo: NavPromo };
}

export async function buildPrimaryNav(): Promise<NavItem[]> {
  const [designs, estates, packages] = await Promise.all([
    getCollection('designs'),
    getCollection('estates'),
    getCollection('packages'),
  ]);

  const rows = packages.map((entry) => entry.data);
  const fromPrice = Math.min(...rows.map(packageFromPrice));

  /* Series, in ascending frontage order, with their real size range. */
  const bySeries = new Map<string, { frontage: number; sizes: number[] }>();
  for (const { data } of designs) {
    const current = bySeries.get(data.series);
    if (current) current.sizes.push(data.squares);
    else bySeries.set(data.series, { frontage: data.frontage, sizes: [data.squares] });
  }
  const seriesLinks: NavLink[] = [...bySeries.entries()]
    .sort((a, b) => a[1].frontage - b[1].frontage)
    .map(([name, { frontage, sizes }]) => {
      const low = Math.min(...sizes);
      const high = Math.max(...sizes);
      return {
        label: name,
        href: `/home-designs/?series=${name.toLowerCase()}`,
        note: `${frontage}m · ${low === high ? `${low}` : `${low}–${Math.round(high)}`} sq`,
      };
    });

  const frontageLinks: NavLink[] = [...new Set(designs.map((d) => d.data.frontage))]
    .sort((a, b) => a - b)
    .map((frontage) => {
      const count = designs.filter((d) => d.data.frontage === frontage).length;
      return {
        label: `${frontage}m frontage`,
        href: `/home-designs/?frontage=${frontage}`,
        note: `${count}`,
      };
    });

  /* Estates that actually hold packages, busiest first. */
  const estateLinks: NavLink[] = estates
    .map((entry) => ({
      data: entry.data,
      count: rows.filter((p) => p.estate === entry.data.id).length,
    }))
    .filter((e) => e.count > 0)
    .sort((a, b) => b.count - a.count)
    .map(({ data, count }) => ({
      label: `${data.name}, ${data.suburb}`,
      href: `/house-and-land/?estate=${data.id}`,
      note: `${count}`,
    }));

  const budgets: [string, number, number][] = [
    ['Under $600k', 0, 600_000],
    ['$600k – $650k', 600_000, 650_000],
    ['$650k and above', 650_000, Number.MAX_SAFE_INTEGER],
  ];
  const budgetLinks: NavLink[] = budgets.map(([label, min, max]) => ({
    label,
    href: `/house-and-land/?price=${min}-${max === Number.MAX_SAFE_INTEGER ? '' : max}`,
    note: `${rows.filter((p) => packageFromPrice(p) > min && packageFromPrice(p) <= max).length}`,
  }));

  const bedroomLinks: NavLink[] = [...new Set(rows.map((p) => p.bedrooms))]
    .sort((a, b) => a - b)
    .map((beds) => ({
      label: `${beds} bedrooms`,
      href: `/house-and-land/?beds=${beds}`,
      note: `${rows.filter((p) => p.bedrooms === beds).length}`,
    }));

  return [
    {
      label: 'Home designs',
      href: '/home-designs/',
      panel: {
        columns: [
          { heading: 'By series', links: seriesLinks },
          { heading: 'By frontage', links: frontageLinks },
        ],
        promo: {
          heading: 'Not sure what fits your block?',
          body: `${designs.length} designs, ${bySeries.size} series, from ${Math.min(...designs.map((d) => d.data.frontage))}m frontage.`,
          cta: { label: 'Find designs by frontage', href: '/home-designs/' },
        },
      },
    },
    {
      label: 'House & land',
      href: '/house-and-land/',
      panel: {
        columns: [
          { heading: 'By estate', links: estateLinks },
          { heading: 'By budget', links: budgetLinks },
          { heading: 'By bedrooms', links: bedroomLinks },
        ],
        promo: {
          heading: 'Land and build in one price.',
          body: `${rows.length} packages available, from ${formatAud(fromPrice)} complete.`,
          cta: { label: 'View packages', href: '/house-and-land/' },
        },
      },
    },
    {
      label: 'Inclusions',
      href: '/inclusions/',
      panel: {
        columns: [
          {
            heading: 'Specifications',
            links: [
              { label: 'SmartSpecs', href: '/inclusions/#smartspecs', note: 'Entry' },
              {
                label: 'LuxeTurnkey',
                href: '/inclusions/#luxeturnkey',
                note: 'Complete',
              },
            ],
          },
          {
            heading: 'Detail',
            links: [
              { label: 'Façades', href: '/inclusions/#facades' },
              { label: 'Full schedule (PDF)', href: '/inclusions/#schedule' },
            ],
          },
        ],
        promo: {
          heading: 'Two levels of finish. One fixed price.',
          body: 'See exactly what separates them.',
          cta: { label: 'Compare', href: '/inclusions/#compare' },
        },
      },
    },
    { label: 'Display', href: '/display-homes/' },
    { label: 'Why DBN', href: '/why-dbn/' },
  ];
}
