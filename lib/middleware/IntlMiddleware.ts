import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LOCALES } from '../localisation/locales';

const handler = createMiddleware({
  locales: SUPPORTED_LOCALES,
  localeDetection: true,
  localePrefix: 'as-needed',

  // Used when no locale matches
  defaultLocale: 'en',
});

export default {
  name: 'IntlMiddleware',
  handler,
  matcher: [
    '^/(?!api).*', // Match all paths except /api
    `/(${SUPPORTED_LOCALES.join('|')})`,
  ],
};