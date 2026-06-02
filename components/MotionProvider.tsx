'use client';

import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * LazyMotion wrappt die App und sorgt dafür, dass framer-motion beim
 * Initial-Render nur den LazyMotion-Loader (~5KB) lädt, nicht die volle
 * Motion-Bibliothek. Children müssen `m.X` statt `motion.X` benutzen —
 * `strict` wirft eine Warnung, falls irgendwo doch `motion.X` verwendet
 * wird, sodass Refactor-Lücken sofort sichtbar werden.
 *
 * `domAnimation` deckt unsere komplette Feature-Nutzung ab:
 * initial / animate / exit, variants, AnimatePresence, whileInView,
 * useScroll / useTransform / useMotionValue / useSpring, useInView,
 * useReducedMotion. Kein drag, kein layout – dafür wäre `domMax` nötig.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
