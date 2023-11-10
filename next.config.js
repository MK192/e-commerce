/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/',
      },
    ];
  },
  images: {
    domains: ['fakestoreapi.com'], // Add the hostname(s) of your image source(s) here
  },
};

module.exports = nextConfig;
