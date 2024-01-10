/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true
  },
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi'
  }
};

module.exports = nextConfig;
