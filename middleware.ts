import middlewareStacker from './lib/middleware/middlewareStacker';
import nextIntlMiddleware from './lib/middleware/nextIntlMiddleware';
import CSRFMiddleware from './lib/middleware/CSRFMiddleware';
import CurrentUrlMiddleware from './lib/middleware/CurrentUrlMiddleware';

export default middlewareStacker([
  CurrentUrlMiddleware,
  nextIntlMiddleware,
  CSRFMiddleware,
]);

export const config = {
  /**
   * Global matcher for all middleware.
   *
   * NOTE: All static paths under public must be excluded from the matcher,
   * otherwise the Intl middleware will intercept them!!
   */
  matcher: ['/((?!_next/static|images|themes|_next/image|favicon.ico).*)'],
};
