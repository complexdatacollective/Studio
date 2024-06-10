// This file is a source of truth for the app's navigation system.
// It defines the routes and their parameters for the app.
// Todo: So, please keep it up to date as you add or remove routes.
// reference: https://github.com/lukemorales/next-safe-navigation/tree/main?tab=readme-ov-file#declare-your-application-routes-and-parameters-in-a-single-place

import { createNavigationConfig } from 'next-safe-navigation';
import { z } from 'zod';

export const { routes, useSafeParams, useSafeSearchParams } =
  createNavigationConfig((defineRoute) => ({
    home: defineRoute('/'),
    signIn: defineRoute('/signin'),
    signUp: defineRoute('/signup'),
    interview: defineRoute('/interview/[interviewId]', {
      params: z.object({
        interviewId: z.string(),
      }),
    }),
    interviewFinished: defineRoute('/interview/finished'),
    onboardProtocolRoute: defineRoute('/onboard/[protocolId]', {
      params: z.object({
        protocolId: z.string(),
      }),
    }),
    onboardError: defineRoute('/onboard/error'),
    onboardNoAnonymousRecruitment: defineRoute(
      '/onboard/no-anonymous-recruitment',
    ),
    orgDashboard: defineRoute('/[org]', {
      params: z.object({
        org: z.string(),
      }),
    }),
    orgSettings: defineRoute('/[org]/settings', {
      params: z.object({
        org: z.string(),
      }),
    }),
    orgProject: defineRoute('/[org]/[project]', {
      params: z.object({
        org: z.string(),
        project: z.string(),
      }),
    }),
    orgProjectParticipants: defineRoute('/[org]/[project]/participants', {
      params: z.object({
        org: z.string(),
        project: z.string(),
      }),
    }),
    orgProjectInterviews: defineRoute('/[org]/[project]/interviews', {
      params: z.object({
        org: z.string(),
        project: z.string(),
      }),
    }),
    orgProjectProtocols: defineRoute('/[org]/[project]/protocols', {
      params: z.object({
        org: z.string(),
        project: z.string(),
      }),
    }),
    orgProjectSettings: defineRoute('/[org]/[project]/settings', {
      params: z.object({
        org: z.string(),
        project: z.string(),
      }),
    }),
  }));
