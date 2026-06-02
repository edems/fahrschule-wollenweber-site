'use client';

import { m, useInView, useReducedMotion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { WordReveal } from './ScrollMotion';

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
};

export default function SectionHeader({ eyebrow, title, description, align = 'left', id }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <m.div
      id={id}
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-14 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <m.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`mb-6 inline-flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <m.span
          className="accent-line"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
        />
        <span className="eyebrow">{eyebrow}</span>
      </m.div>

      <h2 className="display-2 text-offwhite">
        {typeof title === 'string' && !reduce ? <WordReveal text={title} /> : title}
      </h2>

      {description && (
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lede mt-6 max-w-2xl"
        >
          {description}
        </m.p>
      )}
    </m.div>
  );
}
