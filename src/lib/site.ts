/**
 * Site-wide constants.
 *
 * Navigation is built in `nav.ts`, which derives its counts and prices from
 * the data — nothing in the menus is a hardcoded number.
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
    /* `fullAddress` is the single formatted string templates render, so a line
       break can never eat a separator. The parts exist for structured data. */
    fullAddress: '205 Sinclairs Road, Fraser Rise VIC 3335',
    street: '205 Sinclairs Road',
    suburb: 'Fraser Rise',
    state: 'VIC',
    postcode: '3335',
    hours: 'Open 11:00am – 5:00pm, seven days',
    directionsHref:
      'https://www.google.com/maps/dir/?api=1&destination=205+Sinclairs+Road+Fraser+Rise+VIC+3335',
  },
  rating: { value: 4.8, count: 25 },
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

export const footerNav: NavColumn[] = [
  {
    heading: 'Build',
    links: [
      { label: 'Home designs', href: '/home-designs/' },
      { label: 'House & land', href: '/house-and-land/' },
      { label: 'Inclusions', href: '/inclusions/' },
      { label: 'Façades', href: '/inclusions/#facades' },
      { label: 'Display homes', href: '/display-homes/' },
    ],
  },
  {
    heading: 'Buying',
    links: [
      { label: 'Fixed price guarantee', href: '/why-dbn/#fixed-price' },
      { label: 'Turnkey', href: '/why-dbn/#turnkey' },
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
      { label: 'Where we build', href: '/#where-we-build' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Employment & trades', href: '/employment-and-trades/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Clauses & provisions', href: '/clauses-and-provisions/' },
  { label: 'Terms', href: '/terms/' },
];
