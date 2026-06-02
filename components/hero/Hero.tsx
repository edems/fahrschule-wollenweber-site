'use client';

import { useState, useEffect, useRef } from 'react';
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { ModeId } from '@/lib/modes';
import { MODE_ORDER, MODES } from '@/lib/modes';
import VideoStage from './VideoStage';
import ModeChips from './ModeChips';
import HeroContent from './HeroContent';
import ModeEffects from './ModeEffects';

const isValidMode = (s: string | null): s is ModeId =>
  !!s && (MODE_ORDER as string[]).includes(s);

function readInitialMode(): ModeId {
  if (typeof window === 'undefined') return 'auto';
  const hash = window.location.hash;
  const m = hash.match(/mode=([a-z]+)/);
  if (isValidMode(m?.[1] ?? null)) return m![1] as ModeId;
  const params = new URLSearchParams(window.location.search);
  const q = params.get('mode');
  if (isValidMode(q)) return q;
  return 'auto';
}

export default function Hero() {
  const [active, setActive] = useState<ModeId>('auto');
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    setActive(readInitialMode());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const url = new URL(window.location.href);
    url.hash = `mode=${active}`;
    window.history.replaceState(null, '', url.toString());
  }, [active, mounted]);

  const textY = useMotionValue(0);
  const textYSpring = useSpring(textY, { stiffness: 80, damping: 22, mass: 0.4 });
  const textOpacity = useMotionValue(1);
  const chipY = useMotionValue(0);
  const chipYSpring = useSpring(chipY, { stiffness: 100, damping: 25, mass: 0.4 });
  const chipOpacity = useMotionValue(1);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const denom = Math.max(1, rect.height - vh);
      const progress = Math.max(0, Math.min(1, -rect.top / denom));
      textY.set(progress * -140);
      textOpacity.set(Math.max(0, 1 - progress * 2));
      chipY.set(progress * -50);
      chipOpacity.set(Math.max(0, 1 - progress / 0.6));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce, textY, textOpacity, chipY, chipOpacity]);

  // Cursor-Follow Glow (sehr subtil)
  const glowXRaw = useMotionValue(0);
  const glowX = useSpring(glowXRaw, { stiffness: 60, damping: 20 });
  const glowYRaw = useMotionValue(0);
  const glowY = useSpring(glowYRaw, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      glowXRaw.set(((e.clientX - rect.left) / rect.width - 0.5) * 60);
      glowYRaw.set(((e.clientY - rect.top) / rect.height - 0.5) * 60);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, glowXRaw, glowYRaw]);

  return (
    <m.section
      ref={sectionRef}
      id="top"
      className="hero-section relative h-auto min-h-[820px] w-full overflow-hidden lg:h-[100vh] lg:min-h-[860px]"
    >
      <ModeEffects active={active} />
      <VideoStage active={active} />

      {/* Cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(10,10,20,0.55)_0%,rgba(10,10,20,0.25)_30%,rgba(10,10,20,0.15)_55%,rgba(10,10,20,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_20%_50%,rgba(91,79,233,0.18)_0%,transparent_60%)]" />

      {/* Cursor-Follow Glow */}
      {!reduce && (
        <m.div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background: `radial-gradient(circle 500px at calc(50% + ${glowX.get()}px) calc(50% + ${glowY.get()}px), rgba(124,58,237,0.12) 0%, transparent 70%)`,
          }}
        />
      )}

      {!reduce && (
        <m.div
          className="absolute left-0 right-0 top-[96px] z-40"
          style={{ y: chipYSpring, opacity: chipOpacity }}
        >
          <ModeChips active={active} onChange={setActive} />
        </m.div>
      )}
      {reduce && <ModeChips active={active} onChange={setActive} />}

      {/* Scroll indicator (centered-right) */}
      <div className="pointer-events-none absolute right-12 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="rotate-90 text-[10.5px] uppercase tracking-eyebrow text-mute">Scroll</span>
        <div className="h-[60px] w-px animate-scroll-pulse bg-gradient-to-b from-transparent to-violet" />
      </div>

      <m.div
        className="relative z-10 flex h-full items-end justify-center pb-12 pt-32 sm:pb-16 sm:pt-32 lg:pb-20"
        style={reduce ? undefined : { y: textYSpring, opacity: textOpacity }}
      >
        <HeroContent active={active} />
      </m.div>

      <style jsx>{`
        .hero-section {
          animation: hero-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes hero-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-section { animation: none; }
        }
      `}</style>
    </m.section>
  );
}
