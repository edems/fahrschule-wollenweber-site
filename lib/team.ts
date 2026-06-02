export type Fahrlehrer = {
  name: string;
  rolle: string;
  klassen: string[];
  bio: string;
  foto: string;
};

export const TEAM: Fahrlehrer[] = [
  {
    name: 'Michael Wollenweber',
    rolle: 'Inhaber · Fahrlehrer',
    klassen: ['AM', 'M', 'A1', 'A2', 'A', 'B', 'BF17', 'B96', 'BE', 'C1', 'C1E', 'C', 'CE', 'D1', 'D1E', 'D', 'DE', 'L', 'T'],
    bio: 'Michael begleitet Fahrschüler seit Jahrzehnten durch den Westerwald. Sein Motto: ruhig, präzise, fair.',
    foto: 'images/team-michael.png',
  },
  {
    name: 'Susanne Wollenweber',
    rolle: 'Fahrlehrerin',
    klassen: ['AM', 'A2', 'A1', 'A', 'B', 'B96', 'BE', 'L'],
    bio: 'Susanne bringt Ruhe ins Auto. Sie ist spezialisiert auf Einsteiger, Wiedereinsteiger und alle, die auf zwei Rädern unterwegs sein wollen.',
    foto: 'images/team-susanne.png',
  },
  {
    name: 'Alexander Wollenweber',
    rolle: 'Fahrlehrer',
    klassen: ['AM', 'M', 'A1', 'A2', 'A', 'B', 'BF17', 'B96', 'BE', 'C1', 'C1E', 'C', 'CE', 'D1', 'D1E', 'D', 'DE', 'L', 'T'],
    bio: 'Alexander bildet in allen Klassen aus – vom Mofa bis zum LKW. Klare Linie, viel Geduld, ehrliches Feedback.',
    foto: 'images/team-alexander.png',
  },
];
