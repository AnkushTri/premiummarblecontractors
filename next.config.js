/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed "output: export" — needed for API routes to work
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;