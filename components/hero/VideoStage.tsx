'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
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
  const [allowAdjacentPreload, setAllowAdjacentPreload] = useState(false);
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
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 768px)');
    const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
    const update = () => setAllowAdjacentPreload(mq.matches && !connection.connection?.saveData);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    MODE_ORDER.forEach((id) => {
      const v = refs.current[id];
      if (!v) return;
      if (id === active && !reducedMotion) {
        v.classList.add('is-active');
        if (v.paused) {
          v.currentTime = 0;
          v.play().catch(() => undefined);
        }
      } else if (id === active && reducedMotion) {
        v.classList.add('is-active', 'is-paused');
      } else {
        v.classList.remove('is-active', 'is-paused');
      }
    });
  }, [active, reducedMotion]);

  useEffect(() => {
    if (!allowAdjacentPreload) return;
    const currentIdx = MODE_ORDER.indexOf(active);
    const next = MODE_ORDER[(currentIdx + 1) % MODE_ORDER.length];
    const prev = MODE_ORDER[(currentIdx - 1 + MODE_ORDER.length) % MODE_ORDER.length];
    [next, prev].forEach((id) => {
      const v = refs.current[id];
      if (v && v.preload !== 'auto') v.preload = 'auto';
    });
  }, [active, allowAdjacentPreload]);

  // Scroll-Tracking – Video skaliert raus beim Raus-Scrollen, 3D-Tilt mit Maus
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end start'],
  });
  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const scale = useSpring(scaleRaw, { stiffness: 60, damping: 22, mass: 0.5 });
  const yRaw = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const y = useSpring(yRaw, { stiffness: 60, damping: 22, mass: 0.5 });
  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 50, damping: 20 });
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 0.9]);

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
              muted
              loop
              playsInline
              preload={isActive ? 'auto' : allowAdjacentPreload ? 'metadata' : 'none'}
              poster={m.poster}
              aria-hidden={!isActive}
              className={`hero-video ${isActive ? 'is-active' : ''} ${reducedMotion && isActive ? 'is-paused' : ''}`}
            >
              <source src={m.videoMobile} type="video/mp4" media="(max-width: 640px)" />
              <source src={m.video} type="video/mp4" />
            </video>
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
