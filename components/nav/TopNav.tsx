'use client';

import { useEffect, useState } from 'react';
import { m, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const LINKS = [
  { href: '#klassen', label: 'Klassen' },
  { href: '#lernpfade', label: 'Lernpfade' },
  { href: '#spezialleistungen', label: 'Spezialleistungen' },
  { href: '#team', label: 'Team' },
  { href: '#standorte', label: 'Standorte' },
  { href: '#regionen', label: 'Regionen' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { scrollYProgress } = useScroll();
  const navProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  return (
    <m.nav
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line bg-navy-deep/80 backdrop-blur-2xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]'
          : 'border-b border-transparent bg-gradient-to-b from-navy-deep/60 to-transparent backdrop-blur-md'
      }`}
    >
      <m.div
        className="absolute inset-x-0 bottom-0 h-[1px] origin-left bg-gradient-to-r from-brand-blue via-violet to-brand-blue"
        style={{ scaleX: navProgress, opacity: scrolled ? 0.6 : 0 }}
      />

      <div className="container-page flex h-[76px] items-center justify-between">
        <a href="#top" className="group flex items-center gap-3">
          <m.div
            whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.6 } }}
            className="grid h-9 w-9 place-items-center rounded-[10px] bg-gradient-to-br from-brand-blue to-violet text-sm font-extrabold text-offwhite shadow-[0_6px_24px_-8px_rgba(124,58,237,0.6)]"
          >
            W
          </m.div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-wide transition-colors group-hover:text-violet-light">
              Fahrschule Wollenweber
            </div>
            <div className="mt-0.5 text-[10.5px] uppercase tracking-[0.2em] text-mute">
              Bad Marienberg · Hachenburg
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-9 text-[14px] font-medium text-mute md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#kontakt"
            className="hidden md:inline-flex btn-primary !py-2.5 !px-5 !text-[13px]"
          >
            Anmelden <span aria-hidden>→</span>
          </a>
          <button
            aria-label="Menü öffnen"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/[0.04] md:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-4 bg-offwhite transition-transform ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`block h-px w-4 bg-offwhite transition-transform ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-line bg-navy-deep/90 backdrop-blur-xl md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-mute hover:bg-white/5 hover:text-offwhite"
                >
                  {l.label}
                </a>
              ))}
              <a href="#kontakt" onClick={() => setOpen(false)} className="btn-primary mt-2 self-start">
                Anmelden →
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          position: relative;
          transition: color 200ms;
        }
        .nav-link:hover { color: #F8F8FB; }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -6px;
          height: 1px;
          background: linear-gradient(90deg, #5B4FE9 0%, #7C3AED 100%);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-link:hover::after { transform: scaleX(1); }
      `}</style>
    </m.nav>
  );
}
