import createMiddleware from 'next-intl/middleware';
import { SUPPORTED_LOCALES } from './lib/localisation/locales';

export default createMiddleware({
  // A list of all locales that are supported
  locales: SUPPORTED_LOCALES,

  // Used when no locale matches
  defaultLocale: 'en',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*'],
};
