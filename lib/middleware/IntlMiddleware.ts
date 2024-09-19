import { NextResponse, type NextRequest } from 'next/server';
import {
  getAvailableLocales,
  getBestLocale,
  getUserLocale,
} from '../localisation/locale';
import { LOCALE_COOKIES } from '../localisation/config';
import { getLocaleContext } from '../localisation/utils';
import { getInterviewId } from '../serverUtils';

/**
 * Middleware to set a locale cookie (context dependent) if one is not already
 * set, or if the current cookie locale is not supported.
 */
async function IntlMiddleware(req: NextRequest) {
  const response = NextResponse.next();
  const currentPath = req.nextUrl.pathname!;
  const localeContext = getLocaleContext(currentPath);
  const interviewId = getInterviewId(currentPath);
  const availableLocales = await getAvailableLocales(
    localeContext,
    interviewId,
  );
  let userLocale = await getUserLocale(localeContext);
  console.log('userLocale:', userLocale);

  // If there's no user locale, or the user locale is not supported, set the
  // user locale to the best available match.
  if (!userLocale || !availableLocales.includes(userLocale)) {
    userLocale = await getBestLocale(availableLocales);

    // eslint-disable-next-line no-console
    console.log(`Setting locale cookie to: ${userLocale}`);
    response.cookies.set(LOCALE_COOKIES[localeContext], userLocale);
  }

  return response;
}

export default {
  name: 'IntlMiddleware',
  handler: IntlMiddleware,
  matcher: ['^/(?!api).*'],
};
