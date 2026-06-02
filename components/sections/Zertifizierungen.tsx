'use client';

import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger } from '@/components/ui/ScrollMotion';

const BADGES = [
  {
    icon: '🏆',
    value: '20+',
    label: 'Jahre',
    description: 'im Westerwald etabliert, inhabergeführt',
  },
  {
    icon: '✅',
    value: 'Verbandsgemeinde',
    label: 'Bad Marienberg',
    description: 'Fahrlehrer-Erlaubnis durch das Ordnungsamt',
  },
  {
    icon: '📜',
    value: 'BKrFQG',
    label: 'anerkannt',
    description: 'Berufskraftfahrer-Weiterbildung, Schlüsselzahl 95',
  },
  {
    icon: '👨‍👩‍👦',
    value: '3 Fahrlehrer',
    label: 'Familie',
    description: 'Michael, Susanne & Alexander Wollenweber',
  },
  {
    icon: '🏢',
    value: 'HRB 22962',
    label: 'Amtsgericht Montabaur',
    description: 'Eingetragene GmbH',
  },
  {
    icon: '🤝',
    value: 'Mitglied',
    label: 'Fahrlehrerverband',
    description: 'Berufsverband, anerkannte Ausbildungsstätte',
  },
];

export default function Zertifizierungen() {
  return (
    <section id="zertifizierungen" className="section section-light relative">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="Erfahrung & Zertifizierungen"
          title={
            <>
              Die Besten vor Ort — <span className="gradient-text gradient-text-italic">mit Erfahrung, die zählt.</span>
            </>
          }
          description="Inhabergeführt seit über 20 Jahren. Fahrlehrer-Erlaubnis, BKrFQG-anerkannt, eingetragene GmbH. Bei uns bist du in geprüften Händen."
        />

        <Stagger delayStep={0.06} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((b) => (
            <article key={b.label} className="zert-card group">
              <span className="zert-icon" aria-hidden>{b.icon}</span>
              <div className="zert-value">{b.value}</div>
              <div className="zert-label">{b.label}</div>
              <p className="zert-desc">{b.description}</p>
            </article>
          ))}
        </Stagger>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="zert-callout"
        >
          <span className="zert-callout-icon" aria-hidden>★</span>
          <p>
            <strong>Familie Wollenweber</strong> — drei Fahrlehrer mit Herz, Verstand und über 20 Jahren Erfahrung in Bad Marienberg und Hachenburg. Wir bilden dich aus, als wärst du unser eigenes Kind.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .zert-card {
          padding: 24px 24px 26px 24px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(26, 26, 46, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.04);
          transition: border-color 300ms, transform 300ms, box-shadow 300ms;
        }
        .zert-card:hover {
          border-color: rgba(124, 58, 237, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 16px 32px -12px rgba(91, 79, 233, 0.18);
        }
        .zert-icon {
          display: inline-block;
          font-size: 32px;
          margin-bottom: 10px;
        }
        .zert-value {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--c-navy);
          line-height: 1.1;
        }
        .zert-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #6D28D9;
          margin-top: 4px;
          margin-bottom: 8px;
        }
        .zert-desc {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(26, 26, 46, 0.7);
        }
        .zert-callout {
          margin-top: 32px;
          padding: 24px 32px;
          background: linear-gradient(135deg, rgba(91, 79, 233, 0.08) 0%, rgba(124, 58, 237, 0.04) 100%);
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .zert-callout-icon {
          font-size: 32px;
          color: #7C3AED;
          flex-shrink: 0;
        }
        .zert-callout p {
          font-size: 15px;
          line-height: 1.55;
          color: var(--c-navy);
        }
        .zert-callout p strong {
          color: #6D28D9;
        }
      `}</style>
    </section>
  );
}
