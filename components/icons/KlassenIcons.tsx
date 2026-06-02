/**
 * Map of category iconKey → public path to the actual PNG.
 * Single source of truth — easy to swap, no inline SVG fallback needed.
 */
export const KLASSEN_ICON_MAP = {
  motorrad: 'icons/klassen-motorrad.png',
  auto: 'icons/klassen-auto.png',
  lkw: 'icons/klassen-lkw.png',
  bus: 'icons/klassen-bus.png',
  landwirtschaft: 'icons/klassen-landwirtschaft.png',
  seminare: 'icons/klassen-seminare.png',
} as const;

export type KlassenIconKey = keyof typeof KLASSEN_ICON_MAP;
