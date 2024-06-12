import { type NextRequest, NextResponse } from 'next/server';
import type { NextFetchEvent, NextMiddleware } from 'next/server';

// Define the type for middleware with matchers
type MiddlewareWithMatcher = {
  handler: NextMiddleware;
  matcher: string | string[];
};

// Helper function to check if a request matches a matcher pattern
function matches(request: NextRequest, matcher: string | string[]): boolean {
  const url = new URL(request.url);
  const path = url.pathname;

  if (typeof matcher === 'string') {
    return new RegExp(matcher).test(path);
  } else {
    return matcher.some((pattern) => new RegExp(pattern).test(path));
  }
}

export function middlewareStacker(middlewareStack: MiddlewareWithMatcher[]): NextMiddleware {
  return async (request: NextRequest, event: NextFetchEvent) => {
    for (const middleware of middlewareStack) {
      if (matches(request, middleware.matcher)) {
        const response = await middleware.handler(request, event);
        if (response) {
          return response;
        }
      }
    }
    return NextResponse.next();
  };
}
