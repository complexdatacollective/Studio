// This file is a source of truth for the app's navigation system.
// It defines the routes and their parameters for the app.
// Todo: So, please keep it up to date as you add or remove routes.
// reference: https://github.com/lukemorales/next-safe-navigation/tree/main?tab=readme-ov-file#declare-your-application-routes-and-parameters-in-a-single-place

import { createNavigationConfig } from 'next-safe-navigation';
import { z } from 'zod';

// Todo: add back the useSafeParams and useSafeSearchParams exports below as needed
// deleting them temporarily because of knip errors
export const { routes } = createNavigationConfig((defineRoute) => ({
  home: defineRoute('/en'),
  signIn: defineRoute('/en/signin'),
  signUp: defineRoute('/en/signup'),
  interview: defineRoute('/en/interview/[interviewId]', {
    params: z.object({
      interviewId: z.string(),
    }),
  }),
  interviewFinished: defineRoute('/en/interview/finished'),
  onboardProtocolRoute: defineRoute('/en/onboard/[protocolId]', {
    params: z.object({
      protocolId: z.string(),
    }),
  }),
  onboardError: defineRoute('/en/onboard/error'),
  onboardNoAnonymousRecruitment: defineRoute(
    '/en/onboard/no-anonymous-recruitment',
  ),
  orgDashboard: defineRoute('/en/[org]', {
    params: z.object({
      org: z.string(),
    }),
  }),
  orgSettings: defineRoute('/en/[org]/settings', {
    params: z.object({
      org: z.string(),
    }),
  }),
  orgProject: defineRoute('/en/[org]/[project]', {
    params: z.object({
      org: z.string(),
      project: z.string(),
    }),
  }),
  orgProjectParticipants: defineRoute('/en/[org]/[project]/participants', {
    params: z.object({
      org: z.string(),
      project: z.string(),
    }),
  }),
  orgProjectInterviews: defineRoute('/en/[org]/[project]/interviews', {
    params: z.object({
      org: z.string(),
      project: z.string(),
    }),
  }),
  orgProjectProtocols: defineRoute('/en/[org]/[project]/protocols', {
    params: z.object({
      org: z.string(),
      project: z.string(),
    }),
  }),
  orgProjectSettings: defineRoute('/en/[org]/[project]/settings', {
    params: z.object({
      org: z.string(),
      project: z.string(),
    }),
  }),
}));
