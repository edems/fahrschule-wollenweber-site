'use client';

import { useEffect } from 'react';
import { useScroll, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Theme transition map.
 * Maps scroll progress (0-1) to theme states.
 * Each entry: [scrollProgress, theme, optional blendIntensity]
 *
 * Light sections have transparent "in-between" zones — no hard cuts.
 * Dark sections are full anchors.
 *
 * Map (approximated to the planned 12-section funnel):
 * 0.00 - 0.08  → dark (Hero)
 * 0.08 - 0.10  → blend to light (Trust-Bar)
 * 0.10 - 0.18  → light
 * 0.18 - 0.20  → blend to dark (Team)
 * 0.20 - 0.30  → dark
 * 0.30 - 0.32  → blend to light (Bewertungen)
 * 0.32 - 0.55  → light (Bewertungen, Klassen, Spezialleistungen)
 * 0.55 - 0.57  → blend to dark (Fuhrpark)
 * 0.57 - 0.68  → dark
 * 0.68 - 0.70  → blend to light (Zertifizierungen, Standorte, Kontakt, Regionen)
 * 0.70 - 0.96  → light
 * 0.96 - 1.00  → blend to dark (Footer)
 */

export type Theme = 'dark' | 'light';

const THEME_MAP: Array<[number, Theme]> = [
  [0.0, 'dark'],
  [0.08, 'light'],
  [0.18, 'dark'],
  [0.30, 'light'],
  [0.55, 'dark'],
  [0.68, 'light'],
  [0.96, 'dark'],
  [1.0, 'dark'],
];

function interpolateTheme(progress: number): { bg: string; text: string } {
  const safeProgress = Math.max(0, Math.min(1, progress));

  // Find current and next anchor
  let i = 0;
  while (i < THEME_MAP.length - 1 && safeProgress >= THEME_MAP[i + 1][0]) i++;
  const [, startTheme] = THEME_MAP[i];
  const endEntry = THEME_MAP[i + 1];
  if (!endEntry) {
    return themeColors(startTheme);
  }
  const [endProgress, endTheme] = endEntry;

  // If both are the same, no blend needed
  if (startTheme === endTheme) {
    return themeColors(startTheme);
  }

  // Blend zone (between the two anchors): 0.04 of progress = smooth fade
  const blendZone = 0.04;
  const fadeStart = endProgress - blendZone;
  let t: number;
  if (safeProgress < fadeStart) {
    t = 0;
  } else {
    t = (safeProgress - fadeStart) / blendZone;
    t = Math.max(0, Math.min(1, t));
    // Smooth ease in/out
    t = t * t * (3 - 2 * t);
  }

  // Linear interpolate between dark and light colors
  const darkBg = { r: 26, g: 26, b: 46 }; // #1A1A2E
  const lightBg = { r: 237, g: 233, b: 225 }; // #EDE9E1
  const darkText = { r: 248, g: 248, b: 251 };
  const lightText = { r: 26, g: 26, b: 46 };

  const bg = {
    r: Math.round(darkBg.r + (lightBg.r - darkBg.r) * t),
    g: Math.round(darkBg.g + (lightBg.g - darkBg.g) * t),
    b: Math.round(darkBg.b + (lightBg.b - darkBg.b) * t),
  };
  const txt = {
    r: Math.round(darkText.r + (lightText.r - darkText.r) * t),
    g: Math.round(darkText.g + (lightText.g - darkText.g) * t),
    b: Math.round(darkText.b + (lightText.b - darkText.b) * t),
  };

  return {
    bg: `rgb(${bg.r}, ${bg.g}, ${bg.b})`,
    text: `rgb(${txt.r}, ${txt.g}, ${txt.b})`,
  };
}

function themeColors(theme: Theme) {
  if (theme === 'dark') {
    return { bg: '#1A1A2E', text: '#F8F8FB' };
  }
  return { bg: '#EDE9E1', text: '#1A1A2E' };
}

/**
 * Mounts a global scroll listener that interpolates the body background
 * color based on scroll progress. Each section is responsible for its OWN
 * background — this hook only sets the BODY color, which shows through
 * the gaps and is used by TopNav, ScrollProgress, etc.
 *
 * For the actual section transitions, sections are siblings of the body
 * and each has its own background — so light→light and dark→dark
 * naturally have no hard transition.
 */
export default function useScrollColor() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 });
  const currentBg = useMotionValue('#1A1A2E');
  const currentText = useMotionValue('#F8F8FB');

  useEffect(() => {
    if (reduce) return;
    const unsubscribe = smooth.on('change', (v) => {
      const colors = interpolateTheme(v);
      currentBg.set(colors.bg);
      currentText.set(colors.text);
    });
    return unsubscribe;
  }, [smooth, currentBg, currentText, reduce]);

  useEffect(() => {
    if (reduce) {
      document.body.style.background = '#1A1A2E';
      document.body.style.color = '#F8F8FB';
      return;
    }
    const unsubBg = currentBg.on('change', (v) => {
      document.body.style.background = v;
    });
    const unsubText = currentText.on('change', (v) => {
      document.body.style.color = v;
    });
    return () => {
      unsubBg();
      unsubText();
    };
  }, [currentBg, currentText, reduce]);

  return { scrollYProgress: smooth };
}
