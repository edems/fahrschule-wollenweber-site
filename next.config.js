/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages-URL: https://<user>.github.io/<repo-name>/
  // basePath + assetPrefix sorgen dafür, dass Next.js _alle_ Asset-Pfade
  // (CSS, JS, Images, Videos, manuell referenzierte /videos/ und /images/)
  // automatisch mit dem Subpath generiert.
  basePath: '/fahrschule-wollenweber-site',
  assetPrefix: '/fahrschule-wollenweber-site/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
