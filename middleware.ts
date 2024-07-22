import middlewareStacker from './lib/middleware/middlewareStacker';
import nextIntlMiddleware from './lib/middleware/nextIntlMiddleware';
import CSRFMiddleware from './lib/middleware/CSRFMiddleware';
import CurrentUrlMiddleware from './lib/middleware/CurrentUrlMiddleware';

export default middlewareStacker([
  nextIntlMiddleware,
  CurrentUrlMiddleware,
  CSRFMiddleware,
]);

export const config = {
  // Only run middleware at all on these paths:
  matcher: ['/((?!_next/static|images|_next/image|favicon.ico).*)'],
};
