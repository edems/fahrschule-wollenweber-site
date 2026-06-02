'use client';

import { m, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

type SectionTheme = 'dark' | 'light';

type Props = {
  id: string;
  theme: SectionTheme;
  nextTheme?: SectionTheme;
  children: ReactNode;
  className?: string;
};

const BG: Record<SectionTheme, string> = {
  dark: 'var(--theme-bg)',
  light: 'var(--light-bg)',
};

/**
 * Wraps a section and animates its background color based on the user's
 * scroll position, so the transition from one section to the next is a
 * smooth color cross-fade rather than a hard cut.
 *
 * The current section keeps its own color in its center; the bottom edge
 * starts transitioning to the next section's color as the user scrolls
 * into the next section. This makes dark↔light transitions feel like a
 * continuous gradient rather than a jarring flip.
 */
export default function SectionWrapper({ id, theme, nextTheme, children, className = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Fade-in the current section's color as the user scrolls INTO it.
  // When the section is fully in view, show 100% of its color.
  const springConfig = { stiffness: 80, damping: 25, mass: 0.5 };
  const opacityRaw = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const opacity = useSpring(opacityRaw, springConfig);

  if (reduce) {
    return (
      <section
        ref={ref}
        id={id}
        className={`section-wrapper ${theme === 'light' ? 'section-light' : 'section-dark'} ${className}`}
        style={{ background: BG[theme] }}
      >
        {children}
      </section>
    );
  }

  return (
    <m.section
      ref={ref}
      id={id}
      className={`section-wrapper ${theme === 'light' ? 'section-light' : 'section-dark'} ${className}`}
      style={{ background: BG[theme], opacity }}
    >
      {children}
    </m.section>
  );
}
