export type TeamMember = {
  name: string;
  rolle: string;
  klassen: string[];
  bio: string;
  zitat: string;
  foto: string;
  erfahrung: string;
  highlights: string[];
};

export const TEAM: TeamMember[] = [
  {
    name: 'Michael Wollenweber',
    rolle: 'Inhaber & Geschäftsführer',
    klassen: ['AM', 'M', 'A1', 'A2', 'A', 'B', 'BF17', 'B96', 'BE', 'C1', 'C1E', 'C', 'CE', 'D1', 'D1E', 'D', 'DE', 'L', 'T'],
    bio: 'Michael begleitet Fahrschüler seit Jahrzehnten durch den Westerwald. Inhaber der Fahrschule-Wollenweber GmbH, geprüft durch die Verbandsgemeinde Bad Marienberg.',
    zitat: 'Dein Erfolg ist mir wichtig. Ich nehme mir Zeit für jeden.',
    foto: 'images/team-michael.png',
    erfahrung: '20+ Jahre',
    highlights: [
      'Inhaber seit 20+ Jahren',
      'Alle Klassen',
      'Berufskraftfahrer-Weiterbildung',
    ],
  },
  {
    name: 'Susanne Wollenweber',
    rolle: 'Fahrlehrerin',
    klassen: ['AM', 'A2', 'A1', 'A', 'B', 'B96', 'BE', 'L'],
    bio: 'Susanne bringt Ruhe ins Auto und auf das Motorrad. Sie ist spezialisiert auf Einsteiger, Wiedereinsteiger und alle, die auf zwei Rädern unterwegs sein wollen.',
    zitat: 'Wir lehren Sicherheit und Selbstvertrauen — Schritt für Schritt.',
    foto: 'images/team-susanne.png',
    erfahrung: 'Motorrad-Spezialistin',
    highlights: [
      'Spezialistin A-Klassen',
      'BF17 & Motorrad',
      'Sanfte, geduldige Ausbildung',
    ],
  },
  {
    name: 'Alexander Wollenweber',
    rolle: 'Fahrlehrer',
    klassen: ['AM', 'M', 'A1', 'A2', 'A', 'B', 'BF17', 'B96', 'BE', 'C1', 'C1E', 'C', 'CE', 'D1', 'D1E', 'D', 'DE', 'L', 'T'],
    bio: 'Alexander bildet in allen Klassen aus – vom Mofa bis zum LKW. Klare Linie, viel Geduld, ehrliches Feedback. Spezialgebiet: Berufskraftfahrer.',
    zitat: 'Klare Linie, viel Geduld, ehrliches Feedback. So lernst du nachhaltig.',
    foto: 'images/team-alexander.png',
    erfahrung: 'Alle Klassen',
    highlights: [
      'Alle Klassen',
      'Spezialist BKrFQG',
      'LKW & Bus',
    ],
  },
];
