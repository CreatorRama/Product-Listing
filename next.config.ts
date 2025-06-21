/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Add other image hosts if needed
    ],
    // Optional optimization settings
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;