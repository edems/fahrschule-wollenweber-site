'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { ModeId } from '@/lib/modes';
import { MODE_ORDER, MODES } from '@/lib/modes';

type Props = {
  active: ModeId;
};

export default function VideoStage({ active }: Props) {
  const refs = useRef<Record<ModeId, HTMLVideoElement | null>>({
    auto: null,
    motorrad: null,
    lkw: null,
    landwirtschaft: null,
    bus: null,
  });
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    MODE_ORDER.forEach((id) => {
      const v = refs.current[id];
      if (!v) return;
      if (id === active && !reducedMotion) {
        v.classList.add('is-active');
        v.preload = 'auto';
        if (v.paused) {
          v.currentTime = 0;
          v.play().catch(() => undefined);
        }
      } else if (id === active && reducedMotion) {
        v.classList.add('is-active', 'is-paused');
        v.preload = 'auto';
      } else {
        v.classList.remove('is-active', 'is-paused');
        v.preload = 'none';
      }
    });
  }, [active, reducedMotion]);

  useEffect(() => {
    const currentIdx = MODE_ORDER.indexOf(active);
    const next = MODE_ORDER[(currentIdx + 1) % MODE_ORDER.length];
    const prev = MODE_ORDER[(currentIdx - 1 + MODE_ORDER.length) % MODE_ORDER.length];
    [next, prev].forEach((id) => {
      const v = refs.current[id];
      if (v) v.preload = 'metadata';
    });
    MODE_ORDER.forEach((id) => {
      if (id === active || id === next || id === prev) return;
      const v = refs.current[id];
      if (v) v.preload = 'none';
    });
  }, [active]);

  // Scroll-Tracking – Video skaliert raus beim Raus-Scrollen, 3D-Tilt mit Maus
  const scaleRaw = useMotionValue(1);
  const scale = useSpring(scaleRaw, { stiffness: 60, damping: 22, mass: 0.5 });
  const yRaw = useMotionValue(0);
  const y = useSpring(yRaw, { stiffness: 60, damping: 22, mass: 0.5 });
  const rotateXRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 50, damping: 20 });
  const overlayOpacityRaw = useMotionValue(0.4);
  const overlayOpacity = useSpring(overlayOpacityRaw, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const denom = Math.max(1, rect.height + vh);
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / denom));
      scaleRaw.set(1 + progress * 0.22);
      yRaw.set(progress * 80);
      rotateXRaw.set(progress * -2);
      overlayOpacityRaw.set(Math.min(0.9, 0.4 + progress * 0.83));
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
  }, [reduce, scaleRaw, yRaw, rotateXRaw, overlayOpacityRaw]);

  return (
    <div ref={stageRef} className="absolute inset-0 z-0 overflow-hidden" id="video-stage" style={{ perspective: '1200px' }}>
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : {
          scale,
          y,
          rotateX,
          transformOrigin: 'center 80%',
          transformStyle: 'preserve-3d',
        }}
      >
        {MODE_ORDER.map((id) => {
          const m = MODES[id];
          const isActive = id === active;
          return (
            <video
              key={id}
              ref={(el) => {
                refs.current[id] = el;
              }}
              data-mode={id}
              src={m.video}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden={!isActive}
              className={`hero-video ${isActive ? 'is-active' : ''} ${reducedMotion && isActive ? 'is-paused' : ''}`}
            />
          );
        })}
      </motion.div>

      {!reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-navy-deep"
          style={{ opacity: overlayOpacity }}
        />
      )}

      <style jsx>{`
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 700ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: opacity;
        }
        .hero-video.is-active {
          opacity: 1;
        }
        .hero-video.is-paused {
          animation: none !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-video.is-active {
            transition: opacity 300ms ease !important;
          }
        }
      `}</style>
    </div>
  );
}
