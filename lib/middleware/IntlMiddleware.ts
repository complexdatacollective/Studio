import createMiddleware from 'next-intl/middleware';
import { MAIN_LOCALES } from '../localisation/locales';
import type { NextRequest } from 'next/server';
import { isInterviewRoute } from '../localisation/utils';

// simulate getting interview locales from the protocol
// todo: replace with actual implementation
async function fetchInterviewLocales(requestPath: string): Promise<string[]> {
  const interviewId = requestPath.split('/interview/')[1];
  const locale = requestPath.split('/')[1]; //TODO: fix this when we're on default locale

  if (!interviewId) return [];

  try {
    const response = await fetch(
      `http://localhost:3000/api?interviewId=${interviewId}&locale=${locale}`,
    );
    if (!response.ok) {
      console.error('Failed to fetch interview:', response.statusText);
      return [];
    }
    const data = await response.json();
    if (!data.locales) {
      console.log('No protocol locales. Using default');
      return ['en'];
    }
    return data.locales;
  } catch (error) {
    console.error('Error fetching interview locales:', error);
    return [];
  }
}

async function determineLocales(requestPath: string): Promise<string[]> {
  if (isInterviewRoute(requestPath)) {
    return await fetchInterviewLocales(requestPath);
  } else {
    return MAIN_LOCALES;
  }
}

const IntlMiddleware = async (req: NextRequest) => {
  const SUPPORTED_LOCALES = await determineLocales(req.nextUrl.pathname);

  const intlMiddleware = createMiddleware({
    locales: SUPPORTED_LOCALES,
    localeDetection: true,
    localePrefix: 'as-needed',
    defaultLocale: 'en',
  });

  return intlMiddleware(req);
};

export default {
  name: 'IntlMiddleware',
  handler: IntlMiddleware,
  matcher: ['^/(?!api).*'],
};
