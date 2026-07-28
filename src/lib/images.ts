import type { ImageMetadata } from 'astro';

import facadeModern from '../assets/img/designs/facade-modern.jpg';
import facadeRise from '../assets/img/designs/facade-rise.jpg';
import facadeFreedom from '../assets/img/designs/facade-freedom.jpg';
import facadeFresh from '../assets/img/designs/facade-fresh.jpg';
import facadeNarrowA from '../assets/img/designs/facade-narrow-a.jpg';
import facadeNarrowB from '../assets/img/designs/facade-narrow-b.jpg';
import facadeMidA from '../assets/img/designs/facade-mid-a.jpg';
import facadeMidB from '../assets/img/designs/facade-mid-b.jpg';
import facadeStandardA from '../assets/img/designs/facade-standard-a.jpg';
import facadeStandardB from '../assets/img/designs/facade-standard-b.jpg';
import facadeWideA from '../assets/img/designs/facade-wide-a.jpg';
import facadeWideB from '../assets/img/designs/facade-wide-b.jpg';
import facadeXwideA from '../assets/img/designs/facade-xwide-a.jpg';

/**
 * Data records refer to images by key so that the JSON stays portable to a
 * CMS. This is the one place a key becomes a real, build-processed asset.
 */
const facades = {
  'facade-modern': facadeModern,
  'facade-rise': facadeRise,
  'facade-freedom': facadeFreedom,
  'facade-fresh': facadeFresh,
  'facade-narrow-a': facadeNarrowA,
  'facade-narrow-b': facadeNarrowB,
  'facade-mid-a': facadeMidA,
  'facade-mid-b': facadeMidB,
  'facade-standard-a': facadeStandardA,
  'facade-standard-b': facadeStandardB,
  'facade-wide-a': facadeWideA,
  'facade-wide-b': facadeWideB,
  'facade-xwide-a': facadeXwideA,
} as const satisfies Record<string, ImageMetadata>;

export type FacadeKey = keyof typeof facades;

export function facadeImage(key: string): ImageMetadata {
  const image = facades[key as FacadeKey];
  if (!image) throw new Error(`Unknown façade image key: ${key}`);
  return image;
}
