/**
 * Formatting helpers.
 *
 * Every number that reaches the page passes through here, so there is one
 * place where Australian conventions are enforced: en-AU currency with no
 * cents, metric areas only, and never a decimal point as a thousands
 * separator.
 */

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

/** `592400` → `$592,400` */
export function formatAud(amount: number): string {
  return AUD.format(amount);
}

/** `592400` → `$592k` — for chips and compact filter labels only. */
export function formatAudCompact(amount: number): string {
  return `$${Math.round(amount / 1000)}k`;
}

/** `210.06` → `210.06 m²` */
export function formatArea(m2: number): string {
  return `${m2.toFixed(2)} m²`;
}

/** `400` → `400 m²` — land is quoted whole. */
export function formatLand(m2: number): string {
  return `${Math.round(m2)} m²`;
}

/** `22.64` → `22.64 sq`. Squares, never square feet. */
export function formatSquares(squares: number): string {
  return `${squares} sq`;
}

/** `12.5` → `12.5 m` */
export function formatFrontage(metres: number): string {
  return `${metres} m`;
}

/** Squares to square metres. 1 square = 9.290304 m². */
export function squaresToM2(squares: number): number {
  return Math.round(squares * 9.290304 * 100) / 100;
}

/**
 * Victorian First Home Owner Grant: $10,000 on a newly built home valued at
 * $750,000 or less. Derived, never stored on the record.
 */
export const FHOG_CAP = 750_000;

/** Victorian stamp duty is waived entirely up to $600,000. */
export const STAMP_DUTY_EXEMPT_CAP = 600_000;

export function isFhogEligible(total: number): boolean {
  return total <= FHOG_CAP;
}

export function isStampDutyExempt(total: number): boolean {
  return total <= STAMP_DUTY_EXEMPT_CAP;
}

/**
 * The headline price for a package is the lowest specification it is offered
 * at — some packages are listed at LuxeTurnkey only.
 */
export function packageFromPrice(pkg: {
  priceSmartSpecs: number | null;
  priceLuxeTurnkey: number;
}): number {
  return pkg.priceSmartSpecs ?? pkg.priceLuxeTurnkey;
}

/** `3 / 2 / 2` → `3 bed · 2 bath · 2 car` */
export function specLine(beds: number, baths: number, cars: number): string {
  return `${beds} bed · ${baths} bath · ${cars} car`;
}
