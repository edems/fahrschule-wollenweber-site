'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const ratio = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setProgress(ratio);
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-5 top-[110px] bottom-8 z-30 hidden w-[2px] overflow-hidden rounded-full bg-white/[0.07] md:block"
      aria-hidden="true"
    >
      <div
        className="w-full origin-top rounded-full gradient-brand-v transition-transform duration-150 ease-out"
        style={{ height: '100%', transform: `scaleY(${progress})` }}
      />
    </div>
  );
}
