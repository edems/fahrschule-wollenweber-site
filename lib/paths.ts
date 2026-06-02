const BASE_PATH = '/fahrschule-wollenweber-site';

export const asset = (p: string): string =>
  p.startsWith('/') ? `${BASE_PATH}${p}` : p;
