import { type NextRequest, NextResponse } from 'next/server';
import { getBestMatch, isInterviewRoute } from '~/lib/localisation/utils';
import { MAIN_LOCALES } from '../localisation/locales';

async function IntlMiddleware(req: NextRequest) {
  // check if we already have a locale cookie.
  // if we DO and are navigating within the same context, we don't need to do anything
  // if we DO NOT or are navigating to a different context, we need to set the locale cookie again

  // if (req.cookies.get('locale')) {
  //   return NextResponse.next();
  // }

  const appContext = req.cookies.get('app-context')?.value ?? 'main';
  const pathname = new URL(req.url).pathname;

  // we're navigating between interview routes and already have a locale cookie
  if (
    appContext === 'interview' &&
    isInterviewRoute(pathname) &&
    req.cookies.get('locale')
  ) {
    return NextResponse.next();
  }

  // we're navigating between main routes and already have a locale cookie
  if (
    appContext === 'main' &&
    !isInterviewRoute(pathname) &&
    req.cookies.get('locale')
  ) {
    return NextResponse.next();
  }

  let locale = 'en';
  const acceptLanguageHeader = req.headers.get('accept-language') ?? '';
  const acceptedLanguages = acceptLanguageHeader
    .split(',')
    .map((lang) => lang.split(';')[0].trim());

  // check if we're in an interview route
  const currentPath = req.headers.get('x-current-path') ?? '';
  if (isInterviewRoute(currentPath)) {
    const interviewId = currentPath.split('/interview/')[1];
    if (!interviewId) {
      throw new Error('Interview route without interview ID');
    }

    // fetch the protocol accepted locales and use that to set best match

    try {
      const response = await fetch(
        `http://localhost:3000/api/interview/${interviewId}/languages`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch interview locales');
      }
      const data = await response.json();
      if (!data?.locales) {
        throw new Error('No locales found in interview data');
      }

      locale = getBestMatch(data.locales, acceptedLanguages) ?? 'en';

      const res = NextResponse.next();
      console.log('setting locale cookie', locale);
      res.cookies.set('locale', locale);

      res.cookies.set('app-context', 'interview');

      return res;
    } catch (error) {
      console.error('Failed to fetch interview locales:', error);
    }
  }

  // we're in backend
  locale = getBestMatch(MAIN_LOCALES, acceptedLanguages) ?? 'en';
  // Set locale cookie
  const res = NextResponse.next();
  res.cookies.set('locale', locale);

  // Set app context cookie
  res.cookies.set('app-context', 'main');

  return res;
}

export default {
  name: 'IntlMiddleware',
  handler: IntlMiddleware,
  matcher: ['^/(?!api).*'],
};
