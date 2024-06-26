import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/localisation/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Todo: remove this config once we upgrade to Next 15
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
