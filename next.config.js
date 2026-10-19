/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/cps-5745-midterm', // Replace with your exact GitHub repo name
  assetPrefix: '/cps-5745-midterm/',
  images: {
    unoptimized: true, // Required because GitHub Pages doesn't support Next.js image optimization
  },
};

module.exports = nextConfig;