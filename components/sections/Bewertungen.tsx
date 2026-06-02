'use client';

import { motion } from 'framer-motion';
import { REVIEWS, REVIEW_SUMMARY } from '@/lib/reviews';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger, Reveal } from '@/components/ui/ScrollMotion';

const GOOGLE_MAPS = {
  hachenburg: 'https://maps.app.goo.gl/Yip1sEL1naEKuQYv5',
  badMarienberg: 'https://maps.app.goo.gl/TtPHbL8ooj6toKnP6',
};

export default function Bewertungen() {
  return (
    <section id="bewertungen" className="section section-light relative">
      <div className="container-page relative">
        <SectionHeader
          eyebrow="5,0 Sterne · 322 Bewertungen"
          title={
            <>
              Was unsere <span className="gradient-text gradient-text-italic">Fahrschüler</span> sagen.
            </>
          }
          description="Über 320 echte Google-Bewertungen mit 5,0 Sternen. Echte Stimmen, echte Erfahrungen, ehrliche Empfehlungen."
        />

        {/* Hero-Stat mit Sternen */}
        <Reveal className="mb-16">
          <div
            className="relative overflow-hidden rounded-3xl p-8 md:p-12"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 251, 235, 0.7) 100%)',
              border: '1px solid rgba(251, 188, 5, 0.2)',
              boxShadow: '0 12px 40px -12px rgba(251, 188, 5, 0.2)',
            }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-bold leading-none tracking-tightest md:text-8xl" style={{ color: 'var(--c-navy)' }}>
                    {REVIEW_SUMMARY.rating.toFixed(1).replace('.', ',')}
                  </span>
                  <span className="text-2xl font-semibold" style={{ color: 'rgba(26, 26, 46, 0.7)' }}>/ 5,0</span>
                </div>
                <div className="mt-4 flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <motion.span
                      key={n}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: 0.1 * n, ease: [0.22, 1, 0.36, 1] }}
                      className="text-3xl text-[#FBBC05]"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(251, 188, 5, 0.4))' }}
                      aria-hidden
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="mt-3 text-[14px] font-medium" style={{ color: 'rgba(26, 26, 46, 0.7)' }}>
                  Basierend auf <strong style={{ color: 'var(--c-navy)' }}>{REVIEW_SUMMARY.total}</strong> Google-Bewertungen
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {REVIEW_SUMMARY.locations.map((loc, i) => (
                  <motion.div
                    key={loc.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl border p-5"
                    style={{
                      borderColor: 'rgba(26, 26, 46, 0.1)',
                      background: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-[15px] font-semibold" style={{ color: 'var(--c-navy)' }}>{loc.name}</div>
                      <div className="text-[12px] font-semibold" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>{loc.count} Bewertungen</div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-2xl font-bold" style={{ color: 'var(--c-navy)' }}>{loc.rating.toFixed(1).replace('.', ',')}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className="text-sm text-[#FBBC05]" aria-hidden>★</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Reviews Grid */}
        <Stagger delayStep={0.1} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <ReviewCard key={r.name} review={r} />
          ))}
        </Stagger>

        {/* Google Maps CTAs — 2 separate Links pro Standort */}
        <Reveal delay={0.2} className="mt-12">
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid rgba(26, 26, 46, 0.1)',
              boxShadow: '0 8px 32px -8px rgba(91, 79, 233, 0.12)',
            }}
          >
            <div className="mb-5 text-center">
              <div className="eyebrow mb-2" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>Alle Bewertungen lesen</div>
              <h3 className="text-[18px] font-semibold md:text-[20px]" style={{ color: 'var(--c-navy)' }}>
                Wähle deinen Standort – direkt zu den Google-Bewertungen
              </h3>
            </div>
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={GOOGLE_MAPS.hachenburg}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                aria-label="Google-Bewertungen Hachenburg öffnen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Hachenburg · 206 Bewertungen
                <span aria-hidden>↗</span>
              </a>
              <a
                href={GOOGLE_MAPS.badMarienberg}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light"
                aria-label="Google-Bewertungen Bad Marienberg öffnen"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Bad Marienberg · 116 Bewertungen
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[number] }) {
  return (
    <article
      className="review-card group flex h-full flex-col rounded-2xl p-6"
      style={{
        background: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(26, 26, 46, 0.08)',
        boxShadow: '0 4px 16px -4px rgba(0, 0, 0, 0.04)',
      }}
    >
      <div className="mb-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className="text-base text-[#FBBC05]"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(251, 188, 5, 0.3))' }}
            aria-hidden
          >
            ★
          </span>
        ))}
      </div>

      <blockquote className="mb-6 flex-1 text-[15px] leading-relaxed" style={{ color: 'var(--c-navy)' }}>
        „{review.text}"
      </blockquote>

      <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: 'rgba(26, 26, 46, 0.08)' }}>
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[13px] font-bold text-offwhite"
          style={{
            background: 'linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%)',
          }}
          aria-hidden
        >
          {review.initialen}
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-semibold" style={{ color: 'var(--c-navy)' }}>{review.name}</div>
          <div className="text-[12px]" style={{ color: 'rgba(26, 26, 46, 0.6)' }}>
            {review.datum}{review.klasse ? ` · Klasse ${review.klasse}` : ''}
          </div>
        </div>
      </div>

      <style jsx>{`
        .review-card {
          transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 300ms,
                      border-color 300ms;
        }
        .review-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -16px rgba(91, 79, 233, 0.18);
          border-color: rgba(124, 58, 237, 0.3);
        }
      `}</style>
    </article>
  );
}
