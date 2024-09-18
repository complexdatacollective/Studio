import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/localisation/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
};

export default withNextIntl(nextConfig);
