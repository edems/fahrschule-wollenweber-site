/**
 * Map of category iconKey → public path to optimized icon assets.
 * Single source of truth — easy to swap, no inline SVG fallback needed.
 */
export const KLASSEN_ICON_MAP = {
  motorrad: 'icons/optimized/klassen-motorrad.webp',
  auto: 'icons/optimized/klassen-auto.webp',
  lkw: 'icons/optimized/klassen-lkw.webp',
  bus: 'icons/optimized/klassen-bus.webp',
  landwirtschaft: 'icons/optimized/klassen-landwirtschaft.webp',
  seminare: 'icons/optimized/klassen-seminare.webp',
} as const;

export type KlassenIconKey = keyof typeof KLASSEN_ICON_MAP;
