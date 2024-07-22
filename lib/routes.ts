// This file is a source of truth for the app's navigation system.
// It defines the routes and their parameters for the app.
// Todo: So, please keep it up to date as you add or remove routes.
// reference: https://github.com/lukemorales/next-safe-navigation/tree/main?tab=readme-ov-file#declare-your-application-routes-and-parameters-in-a-single-place

import { createNavigationConfig } from 'next-safe-navigation';
import { z } from 'zod';

// Todo: add back the useSafeParams and useSafeSearchParams exports below as needed
// deleting them temporarily because of knip errors
export const { routes } = createNavigationConfig((defineRoute) => ({
  home: defineRoute('/'),
  signIn: defineRoute('/signin'),
  signUp: defineRoute('/signup'),
  studyDashboard: defineRoute('/[study]', {
    params: z.object({
      study: z.string(),
    }),
  }),
  studySettings: defineRoute('/[study]/settings', {
    params: z.object({
      study: z.string(),
    }),
  }),
  orgProtocol: defineRoute('/[study]/[protocol]', {
    params: z.object({
      study: z.string(),
      protocol: z.string(),
    }),
  }),
  authedActions: defineRoute('/[study]/authed-actions', {
    params: z.object({
      study: z.string(),
    }),
  }),
}));
