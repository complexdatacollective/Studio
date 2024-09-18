import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import { getBestMatch, isInterviewRoute } from '~/lib/localisation/utils';
import { MAIN_LOCALES } from '../localisation/config';

export const LOCALE_COOKIES = {
  MAIN: 'locale',
  INTERVIEW: 'interview-locale',
} as const;

async function getProtocolLocales(interviewId: string): Promise<string[]> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/interview/${interviewId}/languages`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch interview locales');
    }
    const data = (await response.json()) as { locales: string[] } | null;

    if (!data?.locales) {
      throw new Error('No locales found in interview data');
    }

    return data.locales;
  } catch (error) {
    throw new Error('Error fetching protocol locales');
  }
}

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
    locale = getBestMatch(MAIN_LOCALES, userLanguages);
    return res;
  } else {
    // check if we're in an interview route
    const interviewId =
      req.headers.get('x-current-path')?.split('/interview/')[1] ?? null;

    // TODO: probably don't want to throw here, but we need to handle this case
    if (!interviewId) {
      throw new Error('Interview route without interview ID');
    }

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
