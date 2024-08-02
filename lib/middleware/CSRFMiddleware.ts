import { verifyRequestOrigin } from 'lucia';
import { type NextRequest, NextResponse } from 'next/server';

function handler(request: NextRequest) {
  if (request.method === 'GET') {
    return NextResponse.next();
  }
  const originHeader = request.headers.get('Origin');
  // NOTE: You may need to use `X-Forwarded-Host` instead
  const hostHeader = request.headers.get('Host');
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, {
      status: 403,
    });
  }
  return NextResponse.next();
}

export default {
  name: 'CSRFMiddleware',
  handler,
  matcher: '/api/*',
};
