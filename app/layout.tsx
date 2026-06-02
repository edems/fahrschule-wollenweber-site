import type { Metadata } from 'next';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import TopNav from '@/components/nav/TopNav';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollColorController from '@/components/ScrollColorController';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fahrschule-wollenweber.de'),
  title: {
    default: 'Fahrschule Wollenweber · Dein Weg zum Führerschein im Westerwald',
    template: '%s · Fahrschule Wollenweber',
  },
  description:
    'Fahrschule Wollenweber GmbH – Premium Fahrschule im Westerwald mit Standorten in Bad Marienberg und Hachenburg. Drei Fahrlehrer, alle Klassen, lockere Atmosphäre.',
  keywords: [
    'Fahrschule Wollenweber',
    'Fahrschule Bad Marienberg',
    'Fahrschule Hachenburg',
    'Fahrschule Westerwald',
    'Führerschein Klasse B',
    'BF17 Westerwald',
    'LKW Führerschein',
    'Motorrad Führerschein',
    'Dein Weg zum Führerschein',
  ],
  authors: [{ name: 'Fahrschule Wollenweber GmbH' }],
  openGraph: {
    title: 'Fahrschule Wollenweber · Dein Weg zum Führerschein im Westerwald',
    description:
      'Premium Fahrschule im Westerwald. Alle Klassen, zwei Standorte, drei Fahrlehrer.',
    url: 'https://www.fahrschule-wollenweber.de',
    siteName: 'Fahrschule Wollenweber',
    locale: 'de_DE',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DrivingSchool',
  '@id': 'https://www.fahrschule-wollenweber.de/#organization',
  name: 'Fahrschule-Wollenweber GmbH',
  alternateName: 'Fahrschule Wollenweber',
  description:
    'Premium Fahrschule im Westerwald mit Standorten in Bad Marienberg und Hachenburg. Alle Führerscheinklassen von Mofa bis Bus.',
  url: 'https://www.fahrschule-wollenweber.de',
  logo: 'https://www.fahrschule-wollenweber.de/images/og-image.jpg',
  telephone: '+49-2661-915550',
  email: 'info@fahrschule-wollenweber.de',
  priceRange: '€€',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Neuer Weg 3',
      addressLocality: 'Bad Marienberg',
      postalCode: '56470',
      addressCountry: 'DE',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Herderstraße 15',
      addressLocality: 'Hachenburg',
      postalCode: '57627',
      addressCountry: 'DE',
    },
  ],
  areaServed: {
    '@type': 'State',
    name: 'Rheinland-Pfalz · Westerwald',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Wednesday'],
      opens: '18:00',
      closes: '19:30',
    },
  ],
  founder: { '@type': 'Person', name: 'Michael Wollenweber' },
  employee: [
    { '@type': 'Person', name: 'Michael Wollenweber' },
    { '@type': 'Person', name: 'Susanne Wollenweber' },
    { '@type': 'Person', name: 'Alexander Wollenweber' },
  ],
  sameAs: ['https://www.facebook.com/pages/Fahrschule-WOLLENWEBER-GmbH/501278146588908'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll />
        <TopNav />
        <ScrollProgress />
        <ScrollColorController />
        {children}
      </body>
    </html>
  );
}
