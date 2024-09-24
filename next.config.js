import createNextIntlPlugin from 'next-intl/plugin';
import nextRoutes from 'nextjs-routes/config';

const withRoutes = nextRoutes({
  outDir: './lib/routes',
});

const withNextIntl = createNextIntlPlugin('./lib/localisation/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // experimental: {
  //   typedRoutes: true,
  // }
};

export default withRoutes(withNextIntl(nextConfig));
