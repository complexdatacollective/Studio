import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LOCALES } from '../localisation/locales';

const handler = createMiddleware({
  // A list of all locales that are supported
  locales: SUPPORTED_LOCALES,

  // Used when no locale matches
  defaultLocale: 'en',
});

export default {
  handler,
  matcher: ['/', `/(${SUPPORTED_LOCALES.join('|')})/:path*`],
};
