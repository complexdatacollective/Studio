//routes.ts
import { z } from 'zod';
import { makeRoute } from './lib/makeRoute';

export const OrgParams = z.object({ orgId: z.string() });

export const Routes = {
  home: makeRoute(({ orgId }) => `/org/${orgId}`, OrgParams),
  signin: makeRoute(() => '/signin'),
  signup: makeRoute(() => '/signup'),
};
