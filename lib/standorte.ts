export type Standort = {
  name: string;
  adresse: string;
  plz: string;
  ort: string;
  telefon: string;
  telefonLabel: string;
  email: string;
  oeffnungszeiten: { tag: string; zeit: string }[];
  mapEmbed: string;
  mapLink: string;
  dummyImage: string;
  theoryLabel: string;
};

export const STANDORTE: Standort[] = [
  {
    name: 'Bad Marienberg',
    adresse: 'Neuer Weg 3',
    plz: '56470',
    ort: 'Bad Marienberg',
    telefon: '02661-915550',
    telefonLabel: '02661 - 91 55 50',
    email: 'info@fahrschule-wollenweber.de',
    theoryLabel: 'Theorie: Mo & Mi · 18:00 – 19:30 Uhr',
    oeffnungszeiten: [
      { tag: 'Mo & Mi', zeit: '18:00 – 19:30 Uhr (Theorie)' },
      { tag: 'Individuelle Termine', zeit: 'nach Vereinbarung' },
    ],
    mapEmbed:
      'https://www.openstreetmap.org/export/embed.html?bbox=7.96%2C50.64%2C8.00%2C50.66&layer=mapnik&marker=50.6517%2C7.9833',
    mapLink: 'https://www.openstreetmap.org/?mlat=50.6517&mlon=7.9833#map=17/50.6517/7.9833',
    dummyImage: 'images/standort-bad-marienberg.jpg',
  },
  {
    name: 'Hachenburg',
    adresse: 'Herderstraße 15',
    plz: '57627',
    ort: 'Hachenburg',
    telefon: '0170-4769911',
    telefonLabel: '0170 / 476 99 11',
    email: 'info@fahrschule-wollenweber.de',
    theoryLabel: 'Theorie: Mo & Mi · 18:00 – 19:30 Uhr',
    oeffnungszeiten: [
      { tag: 'Mo & Mi', zeit: '18:00 – 19:30 Uhr (Theorie)' },
      { tag: 'Individuelle Termine', zeit: 'nach Vereinbarung' },
    ],
    mapEmbed:
      'https://www.openstreetmap.org/export/embed.html?bbox=7.81%2C50.65%2C7.85%2C50.67&layer=mapnik&marker=50.6583%2C7.8333',
    mapLink: 'https://www.openstreetmap.org/?mlat=50.6583&mlon=7.8333#map=17/50.6583/7.8333',
    dummyImage: 'images/standort-hachenburg.jpg',
  },
];

export const HAUPTNUMMER = {
  festnetz: '02661 - 91 55 50',
  festnetzTel: '02661-915550',
  mobil: '0170 / 476 99 11',
  mobilTel: '0170-4769911',
  email: 'info@fahrschule-wollenweber.de',
};
