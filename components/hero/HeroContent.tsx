'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { ModeId } from '@/lib/modes';
import { MODES } from '@/lib/modes';
import { HAUPTNUMMER } from '@/lib/standorte';

type Props = { active: ModeId };

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const WHATSAPP_URL = 'https://wa.me/491704769911?text=Hi%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Fahrstunde%20bei%20Wollenweber.';

export default function HeroContent({ active }: Props) {
  const m = MODES[active];
  const modeKey = active;

  return (
    <div className="container-page relative z-10 grid h-full grid-cols-1 items-end gap-6 pb-28 pt-32 sm:gap-8 sm:pb-20 md:pb-24 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={modeKey + '-badge'}
            {...fadeUp}
            className="mb-5 inline-flex items-center gap-2 sm:mb-7 sm:gap-3"
          >
            <span className="accent-line" />
            <span className="eyebrow">{m.badge}</span>
            <span className="ml-0.5 h-1 w-1 rounded-full bg-violet sm:ml-1" />
            <span className="hidden text-[10.5px] font-semibold uppercase tracking-eyebrow text-mute sm:inline">
              Fahrschule Wollenweber
            </span>
          </motion.div>
        </AnimatePresence>

        <h1 className="display-1 mb-6 w-full text-offwhite sm:mb-7">
          <AnimatePresence mode="wait">
            <motion.span key={modeKey + '-headline'} {...fadeUp} className="block">
              <span className="block">{m.headline[0]}</span>
              <span className="block gradient-text gradient-text-italic">{m.headline[1]}</span>
              <span className="block">{m.headline[2]}</span>
            </motion.span>
          </AnimatePresence>
        </h1>

        {/* Mobile-only compact stats bar */}
        <div className="mb-6 grid grid-cols-3 gap-2 sm:hidden">
          {m.stats.map((s, i) => (
            <motion.div
              key={modeKey + '-mobile-stat-' + i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="glass-pill rounded-xl px-3 py-2.5 text-center"
            >
              <div className="text-[20px] font-bold leading-none tracking-tightest gradient-text">
                {s.value}
              </div>
              <div className="mt-1 text-[9.5px] uppercase tracking-[0.14em] text-mute">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={modeKey + '-vp'}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
            }}
            className="mb-7 max-w-xl space-y-2 sm:mb-8 sm:space-y-2.5"
          >
            {m.versprechen.map((v) => (
              <motion.li
                key={v}
                variants={{
                  hidden: { opacity: 0, x: -12 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                }}
                className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-mute sm:gap-3 sm:text-[14.5px]"
              >
                <span className="mt-[6px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-brand-blue to-violet sm:mt-[7px]" />
                <span className="text-offwhite/90">{v}</span>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 sm:gap-4">
          <a href={m.ctaHref} className="btn-primary w-full justify-center !px-6 !py-4 sm:w-auto">
            <AnimatePresence mode="wait">
              <motion.span
                key={modeKey + '-cta'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="inline-flex items-center gap-2"
              >
                {m.cta} <span className="arrow">→</span>
              </motion.span>
            </AnimatePresence>
          </a>
          <a
            href={`tel:${HAUPTNUMMER.festnetzTel}`}
            className="btn-call w-full justify-center !px-6 !py-4 sm:w-auto"
          >
            <span aria-hidden>📞</span>
            Anrufen: {HAUPTNUMMER.festnetz}
          </a>
        </div>

        {/* ====== PROMINENT DIREKT-KONTAKT-BAR (NEU) ====== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 sm:mt-10"
        >
          <div className="hero-contact-bar">
            <div className="hero-contact-eyebrow">
              <span className="hero-contact-eyebrow-dot" />
              <span>Keine Angst vor dem ersten Schritt — wir beraten gerne.</span>
            </div>
            <div className="hero-contact-actions">
              <a
                href={`tel:${HAUPTNUMMER.festnetzTel}`}
                className="hero-contact-action hero-contact-action-call"
                aria-label="Festnetz anrufen"
              >
                <span className="hero-contact-icon" aria-hidden>📞</span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="hero-contact-label">Festnetz</span>
                  <span className="hero-contact-value">{HAUPTNUMMER.festnetz}</span>
                </span>
              </a>
              <a
                href={`tel:${HAUPTNUMMER.mobilTel}`}
                className="hero-contact-action hero-contact-action-call"
                aria-label="Mobil anrufen"
              >
                <span className="hero-contact-icon" aria-hidden>📱</span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="hero-contact-label">Mobil</span>
                  <span className="hero-contact-value">{HAUPTNUMMER.mobil}</span>
                </span>
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-contact-action hero-contact-action-whatsapp"
                aria-label="WhatsApp schreiben"
              >
                <span className="hero-contact-icon" aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="hero-contact-label">WhatsApp</span>
                  <span className="hero-contact-value">Sofort schreiben</span>
                </span>
              </a>
              <a
                href="#kontakt"
                className="hero-contact-action hero-contact-action-jump"
                aria-label="Zum Kontaktformular springen"
              >
                <span className="hero-contact-icon" aria-hidden>📋</span>
                <span className="flex flex-col items-start leading-tight">
                  <span className="hero-contact-label">Kontaktformular</span>
                  <span className="hero-contact-value">Termin online buchen</span>
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel hidden rounded-3xl p-7 lg:block lg:p-8"
      >
        <div className="mb-5">
          <div className="eyebrow mb-1.5">Aktueller Modus</div>
          <div className="text-[20px] font-semibold text-offwhite">
            <AnimatePresence mode="wait">
              <motion.span
                key={modeKey + '-label'}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className="block"
              >
                {m.label}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="divider-line mb-5" />
        <div className="grid grid-cols-3 gap-x-5 gap-y-5">
          {m.stats.map((s, i) => (
            <motion.div
              key={modeKey + '-stat-' + i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-[26px] font-bold leading-none tracking-tightest gradient-text">
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.16em] text-mute">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="divider-line mt-5 mb-4" />
        <a href="#kontakt" className="inline-flex items-center gap-2 text-[13px] font-semibold text-violet-light hover:text-offwhite">
          Beratung anfragen
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </a>
      </motion.aside>

      <style jsx>{`
        .hero-contact-bar {
          padding: 18px 22px;
          background: rgba(10, 10, 20, 0.55);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(124, 58, 237, 0.3);
          border-radius: 20px;
          box-shadow: 0 12px 36px -10px rgba(0, 0, 0, 0.5);
        }
        .hero-contact-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(248, 248, 251, 0.75);
          margin-bottom: 14px;
          letter-spacing: 0.02em;
        }
        .hero-contact-eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #25D366;
          box-shadow: 0 0 8px rgba(37, 211, 102, 0.6);
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
        .hero-contact-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        @media (min-width: 640px) {
          .hero-contact-actions {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        .hero-contact-action {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 250ms cubic-bezier(0.22, 1, 0.36, 1);
          text-decoration: none;
          color: #F8F8FB;
        }
        .hero-contact-action:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(124, 58, 237, 0.4);
          transform: translateY(-2px);
        }
        .hero-contact-action-call {
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.18) 0%, rgba(124, 58, 237, 0.12) 100%);
          border-color: rgba(124, 58, 237, 0.3);
        }
        .hero-contact-action-call:hover {
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.3) 0%, rgba(124, 58, 237, 0.2) 100%);
        }
        .hero-contact-action-whatsapp {
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.25) 0%, rgba(18, 140, 126, 0.18) 100%);
          border-color: rgba(37, 211, 102, 0.4);
        }
        .hero-contact-action-whatsapp:hover {
          background: linear-gradient(135deg, rgba(37, 211, 102, 0.4) 0%, rgba(18, 140, 126, 0.25) 100%);
          border-color: rgba(37, 211, 102, 0.7);
        }
        .hero-contact-action-jump {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(248, 248, 251, 0.15);
        }
        .hero-contact-action-jump:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(248, 248, 251, 0.3);
        }
        .hero-contact-icon {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          font-size: 16px;
          flex-shrink: 0;
        }
        .hero-contact-action-whatsapp .hero-contact-icon {
          background: rgba(255, 255, 255, 0.15);
        }
        .hero-contact-label {
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(248, 248, 251, 0.6);
        }
        .hero-contact-value {
          font-size: 12px;
          font-weight: 600;
          color: #F8F8FB;
          margin-top: 1px;
        }
        @media (max-width: 480px) {
          .hero-contact-actions {
            grid-template-columns: 1fr 1fr;
          }
          .hero-contact-label {
            font-size: 8.5px;
            letter-spacing: 0.1em;
          }
          .hero-contact-value {
            font-size: 10.5px;
          }
        }
      `}</style>
    </div>
  );
}
