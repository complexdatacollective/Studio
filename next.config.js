/** @type {import('next').NextConfig} */
const nextConfig = {
  // Todo: remove this config once we upgrade to Next 15
  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },
};

export default nextConfig;
