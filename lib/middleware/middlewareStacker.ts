import { type NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextRequest, NextResponse } from 'next/server';
import type { NextFetchEvent, NextMiddleware } from 'next/server';

function isRedirect(response: NextMiddlewareResult): boolean {
  return Boolean(
    response && [301, 302, 303, 307, 308].includes(response.status),
  );
}

// Helper function to update the request with the response from the previous middleware
function updateRequestWithResponse(
  request: NextRequest,
  response: NextResponse | Response,
): NextRequest {
  const updatedHeaders = new Headers(request.headers);

  // Merge headers from the response into the request headers
  response.headers.forEach((value, key) => {
    updatedHeaders.set(key, value);
  });

  // Create a new URL object with the same parameters as the original request
  const updatedUrl = new URL(request.url);

  // Create a new NextRequest object with the updated headers
  const updatedRequest = new NextRequest(updatedUrl, {
    headers: updatedHeaders,
    method: request.method,
    body: request.body,
    referrer: request.referrer,
  });

  // Merge cookies from the response into the request cookies
  if ('cookies' in response) {
    response.cookies.getAll().forEach((cookie) => {
      updatedRequest.cookies.set(cookie.name, cookie.value);
    });
  }

  return updatedRequest;
}

// Define the type for middleware with matchers
type MiddlewareWithMatcher = {
  name: string;
  handler: NextMiddleware;
  matcher: string | string[];
};

// Helper function to check if a request matches a matcher pattern
function matches(
  request: NextRequest,
  matcher: MiddlewareWithMatcher['matcher'],
): boolean {
  const { pathname } = new URL(request.url);

  if (typeof matcher === 'string') {
    return new RegExp(matcher).test(pathname);
  } else {
    return matcher.some((pattern) => new RegExp(pattern).test(pathname));
  }
}

export default function middlewareStacker(
  middlewareStack: MiddlewareWithMatcher[],
): NextMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
  ): Promise<NextMiddlewareResult> => {
    let response: NextMiddlewareResult = null;

    for (const middleware of middlewareStack) {
      if (matches(request, middleware.matcher)) {
        const result = await middleware.handler(request, event);

        if (result) {
          if (response) {
            response.headers.forEach((value, key) => {
              result.headers.set(key, value);
            });
          }

          if (isRedirect(result) || result.status >= 400) {
            return result;
          }

          response = result;
          request = updateRequestWithResponse(request, result);
        }
      }
    }

    return response ?? NextResponse.next();
  };
}
