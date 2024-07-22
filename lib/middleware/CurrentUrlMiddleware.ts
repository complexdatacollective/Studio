import { type NextRequest, NextResponse } from 'next/server';
import { SUPPORTED_LOCALES } from '../localisation/locales';

function handler(request: NextRequest) {
  // Add a new header x-current-path which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set('x-current-path', request.nextUrl.pathname);

  return NextResponse.next({
    headers,
  });
}

export default {
  name: 'CurrentUrlMiddleware',
  handler,
  matcher: ['/', `/(${SUPPORTED_LOCALES.join('|')})/:path*`],
};
