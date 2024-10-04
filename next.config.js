import createNextIntlPlugin from 'next-intl/plugin';
import nextRoutes from 'nextjs-routes/config';

const withRoutes = nextRoutes({
  outDir: './lib/routes',
});

const withNextIntl = createNextIntlPlugin('./lib/localisation/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Handled by CI so not needed during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['lucide-react'] // enables dynamic imports
};

export default withRoutes(withNextIntl(nextConfig));
