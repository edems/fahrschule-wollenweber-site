export type Review = {
  name: string;
  initialen: string;
  text: string;
  datum: string;
  klasse?: string;
  standort?: 'bad-marienberg' | 'hachenburg' | 'beide';
};

export const REVIEWS: Review[] = [
  {
    name: 'Arthur',
    initialen: 'A',
    text: 'Ich kann die Fahrschule auf jeden Fall weiterempfehlen. Mein Fahrlehrerin hat alles immer ruhig und verständlich erklärt. Man hat sich nie unter Druck gesetzt gefühlt und konnte in seinem eigenen Tempo lernen.',
    datum: 'vor 2 Monaten',
    klasse: 'B',
    standort: 'hachenburg',
  },
  {
    name: 'Albion Tahiraj',
    initialen: 'AT',
    text: 'Ich kann diese Fahrschule wirklich von Herzen weiterempfehlen! Vom ersten Kontakt bis zur Prüfung hat einfach alles perfekt gepasst. Die Organisation war super schnell und unkompliziert, man hat sich immer gut aufgehoben gefühlt.',
    datum: 'vor 3 Monaten',
    klasse: 'B',
    standort: 'hachenburg',
  },
  {
    name: 'Валерия Бублик',
    initialen: 'VB',
    text: 'Ich bin so dankbar für diese wunderbare Fahrschule! Die Fahrlehrerin ist einfach großartig – so geduldig, freundlich und professionell. Sie erklärt alles mit viel Ruhe und gibt einem immer ein sicheres Gefühl.',
    datum: 'vor 2 Monaten',
    klasse: 'B',
    standort: 'hachenburg',
  },
  {
    name: 'Hunderte Fahrschüler',
    initialen: '★',
    text: 'Man geht um einiges schlauer und mit einem Grinsen nach Hause.',
    datum: 'aktuelle Bewertung',
    standort: 'beide',
  },
  {
    name: 'Glückliche Prüflinge',
    initialen: '✓',
    text: 'Habe heute bestanden und bin mehr als glücklich.',
    datum: 'aktuelle Bewertung',
    standort: 'bad-marienberg',
  },
];

export const REVIEW_SUMMARY = {
  rating: 5.0,
  total: 322, // 206 (Hachenburg) + 116 (Bad Marienberg)
  locations: [
    { name: 'Hachenburg', rating: 5.0, count: 206 },
    { name: 'Bad Marienberg', rating: 5.0, count: 116 },
  ],
};
