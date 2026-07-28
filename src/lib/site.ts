/**
 * Site-wide constants and navigation.
 *
 * The information architecture here replaces the current site's twelve-link
 * "Resources" dropdown with the five decisions a buyer actually makes.
 * Header, mega menu, mobile drawer and footer all read from this one source,
 * so a nav change is a one-line edit — and so no link can go stale in one
 * place but not another.
 */

export const site = {
  name: 'DBN Homes',
  legalName: 'DBN Homes Pty Ltd',
  positioning: 'Fixed price. Full turnkey. Nothing more to pay.',
  abn: '51 628 368 052',
  builderLicence: 'CDB-U 60416',
  phone: '1300 208 191',
  phoneHref: 'tel:1300208191',
  email: 'info@dbnhomes.com.au',
  display: {
    street: '205 Sinclairs Road',
    suburb: 'Fraser Rise',
    state: 'VIC',
    postcode: '3335',
    hours: 'Open 11:00am – 5:00pm, seven days',
    directionsHref:
      'https://www.google.com/maps/dir/?api=1&destination=205+Sinclairs+Road+Fraser+Rise+VIC+3335',
    /** Single formatted string — templates never reassemble the parts. */
    fullAddress: '205 Sinclairs Road, Fraser Rise VIC 3335',
  },
  rating: { value: 4.8, count: 25 },
  packagesTotal: 81,
  designsTotal: 13,
  suburbsTotal: 24,
  priceHeldMonths: 18,
  googleReviewsHref:
    'https://www.google.com/search?q=DBN+Homes+Pty+Ltd+Fraser+Rise+reviews',
} as const;

export interface NavLink {
  label: string;
  href: string;
  note?: string;
}

export interface NavColumn {
  heading: string;
  links: NavLink[];
}

export interface NavPromo {
  heading: string;
  body: string;
  cta: NavLink;
}

export interface NavItem {
  label: string;
  href: string;
  /** Present when the item opens a mega menu on desktop / an accordion on mobile. */
  panel?: {
    columns: NavColumn[];
    promo: NavPromo;
  };
}

export const primaryNav: NavItem[] = [
  {
    label: 'Home designs',
    href: '/home-designs/',
    panel: {
      columns: [
        {
          heading: 'By frontage',
          links: [
            {
              label: '8.5m frontage',
              href: '/home-designs/?frontage=8.5',
              note: '3 designs',
            },
            {
              label: '10.5m frontage',
              href: '/home-designs/?frontage=10.5',
              note: '3 designs',
            },
            {
              label: '12.5m frontage',
              href: '/home-designs/?frontage=12.5',
              note: '4 designs',
            },
            {
              label: '14m frontage',
              href: '/home-designs/?frontage=14',
              note: '2 designs',
            },
            {
              label: '16m frontage',
              href: '/home-designs/?frontage=16',
              note: '1 design',
            },
          ],
        },
        {
          heading: 'By series',
          links: [
            {
              label: 'Tennyson',
              href: '/home-designs/?series=tennyson',
              note: '12 – 17 sq',
            },
            {
              label: 'Ofarell',
              href: '/home-designs/?series=ofarell',
              note: '16 – 20 sq',
            },
            {
              label: 'Corella',
              href: '/home-designs/?series=corella',
              note: '18 – 25 sq',
            },
            { label: 'Avenue', href: '/home-designs/?series=avenue', note: '23 – 25 sq' },
            { label: 'Highbury', href: '/home-designs/?series=highbury', note: '26 sq' },
          ],
        },
      ],
      promo: {
        heading: 'Not sure what fits your block?',
        body: "Tell us your frontage and we'll show you every design that works on it.",
        cta: { label: 'Find my designs', href: '/home-designs/' },
      },
    },
  },
  {
    label: 'House & land',
    href: '/house-and-land/',
    panel: {
      columns: [
        {
          heading: 'By region',
          links: [
            {
              label: 'Melbourne West',
              href: '/house-and-land/?region=melbourne-west',
              note: '26',
            },
            { label: 'Ballarat', href: '/house-and-land/?region=ballarat', note: '21' },
            {
              label: 'Melbourne North',
              href: '/house-and-land/?region=melbourne-north',
              note: '12',
            },
            { label: 'Geelong', href: '/house-and-land/?region=geelong', note: '10' },
            {
              label: 'South East',
              href: '/house-and-land/?region=melbourne-south-east',
              note: '6',
            },
            { label: 'Gippsland', href: '/house-and-land/?region=gippsland', note: '6' },
          ],
        },
        {
          heading: 'By estate',
          links: [
            { label: 'Aldo, Fraser Rise', href: '/house-and-land/?estate=aldo' },
            {
              label: 'Society 1056, Fraser Rise',
              href: '/house-and-land/?estate=society-1056',
            },
            { label: 'Monarch, Deanside', href: '/house-and-land/?estate=monarch' },
            {
              label: 'Maplewood, Melton South',
              href: '/house-and-land/?estate=maplewood',
            },
            { label: 'Riverwalk, Werribee', href: '/house-and-land/?estate=riverwalk' },
            {
              label: 'Dream Ballarat, Sebastopol',
              href: '/house-and-land/?estate=dream-ballarat',
            },
          ],
        },
        {
          heading: 'By budget',
          links: [
            { label: 'Under $600k', href: '/house-and-land/?price=0-600000' },
            { label: '$600k – $650k', href: '/house-and-land/?price=600000-650000' },
            { label: '$650k and above', href: '/house-and-land/?price=650000-999999' },
          ],
        },
      ],
      promo: {
        heading: '81 packages available now.',
        body: 'From $524,105 complete, land included.',
        cta: { label: 'View all packages', href: '/house-and-land/' },
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
            { label: 'LuxeTurnkey', href: '/inclusions/#luxeturnkey', note: 'Complete' },
            { label: 'Compare side by side', href: '/inclusions/#compare' },
          ],
        },
        {
          heading: 'Detail',
          links: [
            { label: 'Façade range', href: '/inclusions/#facades' },
            { label: 'Full inclusions schedule', href: '/inclusions/#schedule' },
            { label: 'Fixed price guarantee', href: '/why-dbn/#fixed-price' },
          ],
        },
      ],
      promo: {
        heading: 'Two levels of finish. One fixed price.',
        body: 'See exactly what separates them.',
        cta: { label: 'Compare inclusions', href: '/inclusions/#compare' },
      },
    },
  },
  { label: 'Display homes', href: '/display-homes/' },
  { label: 'Why DBN', href: '/why-dbn/' },
];

export const footerNav: NavColumn[] = [
  {
    heading: 'Build',
    links: [
      { label: 'Home designs', href: '/home-designs/' },
      { label: 'House & land packages', href: '/house-and-land/' },
      { label: 'Inclusions', href: '/inclusions/' },
      { label: 'Façades', href: '/inclusions/#facades' },
      { label: 'Display homes', href: '/display-homes/' },
    ],
  },
  {
    heading: 'Buying',
    links: [
      { label: 'Fixed price guarantee', href: '/why-dbn/#fixed-price' },
      { label: 'Full turnkey', href: '/why-dbn/#turnkey' },
      { label: 'Build process', href: '/why-dbn/#build-process' },
      { label: 'First home buyers', href: '/first-home-buyers/' },
      { label: 'Finance', href: '/finance/' },
      { label: 'FAQs', href: '/why-dbn/#faqs' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Why DBN', href: '/why-dbn/' },
      { label: 'Where we build', href: '/house-and-land/#where-we-build' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Employment & trades', href: '/employment-and-trades/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy policy', href: '/privacy/' },
  { label: 'Clauses & provisions', href: '/clauses-and-provisions/' },
  { label: 'Terms', href: '/terms/' },
];
