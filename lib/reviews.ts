export type Review = {
  name: string;
  initialen: string;
  text: string;
  datum: string;
  klasse?: string;
  standort?: 'bad-marienberg' | 'hachenburg' | 'beide';
  lehrerBezug?: string;
};

export const REVIEWS: Review[] = [
  {
    name: 'Arthur',
    initialen: 'A',
    text: 'Ich kann die Fahrschule auf jeden Fall weiterempfehlen. Mein Fahrlehrerin hat alles immer ruhig und verständlich erklärt. Man hat sich nie unter Druck gesetzt gefühlt und konnte in seinem eigenen Tempo lernen.',
    datum: 'vor 2 Monaten',
    klasse: 'B',
    standort: 'hachenburg',
    lehrerBezug: 'Susanne · Klasse B',
  },
  {
    name: 'Albion Tahiraj',
    initialen: 'AT',
    text: 'Ich kann diese Fahrschule wirklich von Herzen weiterempfehlen! Vom ersten Kontakt bis zur Prüfung hat einfach alles perfekt gepasst. Die Organisation war super schnell und unkompliziert.',
    datum: 'vor 3 Monaten',
    klasse: 'B',
    standort: 'hachenburg',
    lehrerBezug: 'Susanne · Klasse B',
  },
  {
    name: 'Валерия Бублик',
    initialen: 'VB',
    text: 'Ich bin so dankbar für diese wunderbare Fahrschule! Die Fahrlehrerin ist einfach großartig – so geduldig, freundlich und professionell. Dank ihr habe ich mich beim ersten Mal sicher genug gefühlt.',
    datum: 'vor 2 Monaten',
    klasse: 'B',
    standort: 'hachenburg',
    lehrerBezug: 'Susanne · Klasse B',
  },
  {
    name: 'Tausende Fahrschüler',
    initialen: '★',
    text: 'Man geht um einiges schlauer und mit einem Grinsen nach Hause.',
    datum: 'aktuelle Bewertung',
    standort: 'beide',
    lehrerBezug: 'Wollenweber-Team',
  },
  {
    name: 'Glückliche Prüflinge',
    initialen: '✓',
    text: 'Habe heute bestanden und bin mehr als glücklich. Danke an Alexander für die ruhige Art!',
    datum: 'aktuelle Bewertung',
    standort: 'bad-marienberg',
    lehrerBezug: 'Alexander · Klasse B',
  },
];

export const REVIEW_SUMMARY = {
  rating: 5.0,
  total: 322,
  locations: [
    { name: 'Hachenburg', rating: 5.0, count: 206 },
    { name: 'Bad Marienberg', rating: 5.0, count: 116 },
  ],
};
