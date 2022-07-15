/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STEPZEN_API_KEY: process.env.STEPZEN_API_KEY,
    STEPZEN_API_URL: process.env.STEPZEN_API_URL,
    STEPZEN_MORALIS_API_KEY: process.env.STEPZEN_MORALIS_API_KEY,
  },
  images: {
    domains: ["stepzen.com"],
  },
};

module.exports = nextConfig;
