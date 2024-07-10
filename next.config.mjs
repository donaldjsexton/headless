/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'landingfoliocom.imgix.net',
      },
      {
        protocol: 'https',
        hostname: 'loading.io',
      },
      {
        protocol: 'https',
        hostname: 'snehaltayde.com',
      },
    ],
  },
};

export default nextConfig;
