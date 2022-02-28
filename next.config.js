/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
    concurrentFeatures: true,
    serverComponents: true,
    runtime: true,
  },
}

module.exports = nextConfig
