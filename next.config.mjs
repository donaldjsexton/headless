/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'donsex.dreamhosters.com', 
      },
    ],
  },
};

module.exports = nextConfig;
