/* eslint-disable @typescript-eslint/consistent-type-definitions */
import 'react';
import type en from '~/lib/localisation/messages/en.json';

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicAttributes {
      // custom data attribute used by onboarding wizard
      'data-wizard-step'?: {
        content: Record<string, ReactNode>;
      };
    }
  }
}
