/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  ...(isGithubPages
    ? {
        // GitHub Pages-URL: https://<user>.github.io/<repo-name>/
        // Lokal bleibt die App unter / erreichbar; Pages bekommt den Repo-Subpath.
        basePath: '/fahrschule-wollenweber-site',
        assetPrefix: '/fahrschule-wollenweber-site/',
      }
    : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
