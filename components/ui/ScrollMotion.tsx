'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useReducedMotion } from 'framer-motion';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'header' | 'span' | 'p';
  amount?: number;
  once?: boolean;
  duration?: number;
};

export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  className,
  as = 'div',
  amount = 0.2,
  once = true,
  duration = 0.7,
}: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });

  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

type ParallaxProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

export function Parallax({ children, speed = 0.15, className, style }: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yRaw = useTransform(scrollYProgress, [0, 1], [speed * -80, speed * 80]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 20, mass: 0.4 });

  if (reduce) {
    return <div ref={ref} className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ ...style, y }} className={className}>
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  delayStep?: number;
  className?: string;
  y?: number;
  amount?: number;
};

export function Stagger({ children, delayStep = 0.08, className, y = 24, amount = 0.15 }: StaggerProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  if (reduce) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: delayStep } },
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
};

export function WordReveal({ text, className, delay = 0 }: WordRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(' ');

  if (reduce) {
    return <span ref={ref} className={className}>{text}</span>;
  }

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="inline-block"
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

type MagneticHoverProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function MagneticHover({ children, className, strength = 0.2 }: MagneticHoverProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)' }}
    >
      {children}
    </div>
  );
}
