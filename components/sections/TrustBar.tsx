'use client';

import { motion } from 'framer-motion';

type Signal = {
  icon: 'stars' | 'reviews' | 'lehrer' | 'standorte' | 'erfahrung';
  value: string;
  label: string;
};

const TRUST_SIGNALS: Signal[] = [
  { icon: 'stars', value: '5,0', label: 'Sterne' },
  { icon: 'reviews', value: '322', label: 'Google-Bewertungen' },
  { icon: 'lehrer', value: '3', label: 'Fahrlehrer' },
  { icon: 'standorte', value: '2', label: 'Standorte' },
  { icon: 'erfahrung', value: '20+', label: 'Jahre Erfahrung' },
];

function TrustIcon({ name }: { name: Signal['icon'] }) {
  switch (name) {
    case 'stars':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case 'reviews':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'lehrer':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'standorte':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'erfahrung':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
  }
}

export default function TrustBar() {
  return (
    <section
      className="trustbar"
      aria-label="Vertrauenssignale"
    >
      <div className="container-page">
        <motion.ul
          className="trustbar-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {TRUST_SIGNALS.map((s, i) => (
            <motion.li
              key={i}
              className="trustbar-card"
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <span className="trustbar-icon" aria-hidden>
                <TrustIcon name={s.icon} />
              </span>
              <div className="trustbar-text">
                <div className="trustbar-value">{s.value}</div>
                <div className="trustbar-label">{s.label}</div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <style jsx>{`
        :global(.trustbar) {
          background: rgba(26, 26, 46, 0.4);
          border-top: 1px solid rgba(124, 58, 237, 0.15);
          border-bottom: 1px solid rgba(124, 58, 237, 0.15);
          padding: 22px 0;
          position: relative;
        }
        :global(.trustbar)::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, rgba(91, 79, 233, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        :global(.trustbar-grid) {
          position: relative;
          list-style: none;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 0;
          margin: 0;
        }
        @media (min-width: 640px) {
          :global(.trustbar-grid) {
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
        }
        @media (min-width: 900px) {
          :global(.trustbar-grid) {
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
          }
        }
        :global(.trustbar-card) {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(124, 58, 237, 0.18);
          backdrop-filter: blur(6px);
          transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1),
                      background 250ms,
                      border-color 250ms;
        }
        :global(.trustbar-card):hover {
          transform: translateY(-2px);
          background: rgba(124, 58, 237, 0.08);
          border-color: rgba(124, 58, 237, 0.35);
        }
        @media (min-width: 640px) {
          :global(.trustbar-card) { padding: 16px 18px; }
        }
        :global(.trustbar-icon) {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.15) 0%, rgba(124, 58, 237, 0.1) 100%);
          color: #C4B5FD;
          flex-shrink: 0;
        }
        :global(.trustbar-text) {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        :global(.trustbar-value) {
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #F8F8FB;
          line-height: 1.1;
        }
        :global(.trustbar-label) {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(248, 248, 251, 0.65);
          margin-top: 4px;
        }
        @media (min-width: 640px) {
          :global(.trustbar-value) { font-size: 20px; }
          :global(.trustbar-label) { font-size: 11px; }
        }
      `}</style>
    </section>
  );
}
