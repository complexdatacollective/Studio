import { type NextRequest, NextResponse } from 'next/server';

function handler(request: NextRequest) {
  // This _should_ work, but doesn't. i18n header is changed into
  // x-middleware-request as per here: https://github.com/vercel/next.js/issues/49442

  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set('x-current-path', request.nextUrl.pathname);

  // // You can also set request headers in NextResponse.rewrite
  // return NextResponse.next({
  //   headers: requestHeaders,
  // });

  // This "works", but shouldn't. It clobbers all other headers.
  const response = NextResponse.next();

  response.headers.set('x-current-path', request.nextUrl.pathname);
  return response;
}

export default {
  name: 'CurrentUrlMiddleware',
  handler,
  matcher: '/*',
};
