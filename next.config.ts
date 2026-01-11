import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  env: {
    SERVER_URL: process.env.SERVER_URL,
    GOOGLE_RECAPTCHA_SITE_KEY: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.yandex.net',
      },
      {
        protocol: 'http',
        hostname: 'dot-ship.com',
        port: '5000',
        pathname: '/game/photo/**',
      },
      {
        protocol: 'http',
        hostname: 'dot-ship.com',
        port: '5000',
        pathname: '/user/avatar/**',
      },
    ],
  },
};

export default nextConfig;
