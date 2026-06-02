'use client';

import { motion } from 'framer-motion';
import { REVIEWS, REVIEW_SUMMARY } from '@/lib/reviews';
import SectionHeader from '@/components/ui/SectionHeader';
import { Stagger, Reveal } from '@/components/ui/ScrollMotion';

export default function Bewertungen() {
  return (
    <section id="bewertungen" className="section section-light relative">
      <div className="container-page">
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
          <div className="light-card relative overflow-hidden rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-7xl font-bold leading-none tracking-tightest md:text-8xl" style={{ color: 'var(--c-navy)' }}>
                    {REVIEW_SUMMARY.rating.toFixed(1).replace('.', ',')}
                  </span>
                  <span className="text-2xl font-semibold" style={{ color: 'var(--c-navy)' }}>/ 5,0</span>
                </div>
                <div className="mt-4 flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <motion.span
                      key={n}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: 0.1 * n, ease: [0.22, 1, 0.36, 1] }}
                      className="text-3xl text-[#FBBC05] drop-shadow-sm"
                      aria-hidden
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                <p className="mt-3 text-[14px] font-medium" style={{ color: 'var(--light-text-mute)' }}>
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
                    style={{ borderColor: 'var(--light-line)', background: 'rgba(255, 255, 255, 0.5)' }}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-[15px] font-semibold" style={{ color: 'var(--c-navy)' }}>{loc.name}</div>
                      <div className="text-[12px] font-semibold" style={{ color: 'var(--light-text-mute)' }}>{loc.count} Bewertungen</div>
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

        {/* Google Maps CTA */}
        <Reveal delay={0.2} className="mt-10 text-center">
          <a
            href="https://www.google.com/maps/place/Fahrschule+Wollenweber+GmbH/@50.65366,7.81984,17z/data=!3m1!4b1!4m10!1m2!2m1!1swollenweber!3m6!1s0x47be9c332a03053f:0x27bf16399d07a349!8m2!3d50.65366!4d7.81984!16s%2Fg%2F124ynm5lb"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light"
          >
            Alle 322 Bewertungen auf Google ansehen
            <span aria-hidden>↗</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: typeof REVIEWS[number] }) {
  return (
    <article className="light-card review-card group flex h-full flex-col rounded-2xl p-6">
      {/* Sterne */}
      <div className="mb-4 flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className="text-base text-[#FBBC05]" aria-hidden>★</span>
        ))}
      </div>

      {/* Text */}
      <blockquote className="mb-6 flex-1 text-[15px] leading-relaxed" style={{ color: 'var(--c-navy)' }}>
        „{review.text}"
      </blockquote>

      {/* Meta */}
      <div className="flex items-center gap-3 border-t pt-4" style={{ borderColor: 'var(--light-line)' }}>
        <div
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[13px] font-bold"
          style={{
            background: 'linear-gradient(135deg, #5B4FE9 0%, #7C3AED 100%)',
            color: '#F8F8FB',
          }}
          aria-hidden
        >
          {review.initialen}
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-semibold" style={{ color: 'var(--c-navy)' }}>{review.name}</div>
          <div className="text-[12px]" style={{ color: 'var(--light-text-mute)' }}>
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
