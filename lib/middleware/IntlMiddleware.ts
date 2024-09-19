import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import { getBestMatch, isInterviewRoute } from '~/lib/localisation/utils';
import { BACKEND_LOCALES } from '../localisation/config';
import { getInterviewId } from '../serverUtils';

export const LOCALE_COOKIES = {
  MAIN: 'locale',
  INTERVIEW: 'interview-locale',
} as const;

async function IntlMiddleware(req: NextRequest) {
  const pathname = new URL(req.url).pathname;
  const appContext = isInterviewRoute(pathname) ? 'INTERVIEW' : 'MAIN';

  const cookieForContext = LOCALE_COOKIES[appContext];

  // Check if we already have a locale cookie set
  if (req.cookies.get(cookieForContext)) {
    console.log('Locale cookie already set');
    return NextResponse.next();
  }

  // Construct a response object
  const res = NextResponse.next();
  let locale: string;

  // Get the user's accepted languages
  const userLanguages = new Negotiator({
    headers: {
      'accept-language': req.headers.get('accept-language') ?? undefined,
    },
  }).languages();

  // In the main app, use our built-in locales
  if (appContext === 'MAIN') {
    locale = getBestMatch(BACKEND_LOCALES, userLanguages);
    return res;
  } else {
    // check if we're in an interview route
    const interviewId = getInterviewId();

    // fetch the protocol accepted locales and use that to set best match
    const protocolLocales = await getProtocolLocales(interviewId);
    locale = getBestMatch(protocolLocales, userLanguages);
  }

  // Set the cookie for the current context
  res.cookies.set(cookieForContext, locale);

  return res;
}

export default {
  name: 'IntlMiddleware',
  handler: IntlMiddleware,
  matcher: ['^/(?!api).*'],
};
