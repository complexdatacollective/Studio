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
  output: 'standalone',
  // Todo: remove this config once it is fixed in a compatible version of next
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
};

export default withNextIntl(nextConfig);
