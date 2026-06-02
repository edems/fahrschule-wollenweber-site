export type ModeId = 'auto' | 'motorrad' | 'lkw' | 'landwirtschaft' | 'bus';

export type ModeConfig = {
  id: ModeId;
  label: string;
  video: string;
  poster?: string;
  badge: string;
  headline: [string, string, string];
  versprechen: string[];
  cta: string;
  ctaHref: string;
  stats: { value: string; label: string }[];
};

export const BRAND_SLOGAN = 'Dein Weg zum Führerschein';
export const BRAND_VERSPRECHEN = [
  'An vielen Standorten im Westerwald',
  'Lockere Atmosphäre',
  'Qualität steht bei uns im Vordergrund',
  'Wir lehren Sicherheit und Selbstvertrauen',
];

export const MODES: Record<ModeId, ModeConfig> = {
  auto: {
    id: 'auto',
    label: 'Auto',
    video: 'videos/hero-auto-v1.mp4',
    poster: 'images/poster-auto.jpg',
    badge: 'Klasse B · BF17',
    headline: ['Dein Weg', 'zum Führerschein.', 'Im Westerwald.'],
    versprechen: [
      'Vom klassischen Autoführerschein bis BF17',
      'Michael, Susanne & Alexander bilden dich aus',
      'Lerne auf deinen Straßen, nicht auf fremden',
    ],
    cta: 'Klasse B starten',
    ctaHref: '#kontakt',
    stats: [
      { value: '20+', label: 'Klassen' },
      { value: '2', label: 'Standorte' },
      { value: '3', label: 'Fahrlehrer' },
    ],
  },
  motorrad: {
    id: 'motorrad',
    label: 'Motorrad',
    video: 'videos/hero-motorrad-v1.mp4',
    poster: 'images/poster-motorrad.jpg',
    badge: 'AM · A1 · A2 · A',
    headline: ['Freiheit', 'auf zwei Rädern.', 'Kurvig, ehrlich.'],
    versprechen: [
      'Vom Mofa bis zur offenen Motorradklasse',
      'Spezialistin Susanne für A-Klassen',
      'Sicherheit und Selbstvertrauen von Anfang an',
    ],
    cta: 'Motorrad-Klasse wählen',
    ctaHref: '#kontakt',
    stats: [
      { value: '5', label: 'Motorrad-Klassen' },
      { value: '1', label: 'Spezialistin' },
      { value: '100%', label: 'Leidenschaft' },
    ],
  },
  lkw: {
    id: 'lkw',
    label: 'LKW',
    video: 'videos/hero-lkw-v1.mp4',
    poster: 'images/poster-lkw.jpg',
    badge: 'C1 · C1E · C · CE',
    headline: ['Profi am Steuer.', 'Jeder Zentner.', 'Sicher unterwegs.'],
    versprechen: [
      'Berufskraftfahrer-Weiterbildung (BKrFQG)',
      'Vom leichten C1 bis zum schweren Lastzug CE',
      'Verantwortung lernen, die trägt',
    ],
    cta: 'LKW-Ausbildung anfragen',
    ctaHref: '#kontakt',
    stats: [
      { value: '4', label: 'LKW-Klassen' },
      { value: '5×7h', label: 'Module' },
      { value: 'BKrFQG', label: 'anerkannt' },
    ],
  },
  landwirtschaft: {
    id: 'landwirtschaft',
    label: 'Landwirtschaft',
    video: 'videos/hero-Landwirtschaft-v1.mp4',
    poster: 'images/poster-landwirtschaft.jpg',
    badge: 'L · T',
    headline: ['Vom Hof', 'auf die Straße.', 'Direkt aus der Region.'],
    versprechen: [
      'Zugmaschinen und landwirtschaftliche Nutzung',
      'Klasse L bis 40 km/h, Klasse T ohne Grenze',
      'Praxisnah, mit Hof, Feld und Straße im Blick',
    ],
    cta: 'Klasse L/T anfragen',
    ctaHref: '#kontakt',
    stats: [
      { value: '2', label: 'Klassen' },
      { value: '15+', label: 'Jahre Erfahrung' },
      { value: 'Ww.', label: 'kompetent' },
    ],
  },
  bus: {
    id: 'bus',
    label: 'Bus',
    video: 'videos/hero-bus-v1.mp4',
    poster: 'images/poster-bus.jpg',
    badge: 'D1 · D1E · D · DE',
    headline: ['Menschen bewegen.', 'Sicher ankommen.', 'Täglich.'],
    versprechen: [
      'Omnibus-Klassen für den Personenverkehr',
      'D1 bis DE – vom Kleinbus bis zum Gelenkbus',
      'Verantwortung für Fahrgäste verstehen lernen',
    ],
    cta: 'Bus-Klasse anfragen',
    ctaHref: '#kontakt',
    stats: [
      { value: '4', label: 'Bus-Klassen' },
      { value: '24/7', label: 'Beratung' },
      { value: '1', label: 'Mission' },
    ],
  },
};

export const MODE_ORDER: ModeId[] = ['auto', 'motorrad', 'lkw', 'landwirtschaft', 'bus'];
