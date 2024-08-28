/* eslint-disable @typescript-eslint/consistent-type-definitions */
import 'react';
import type en from '~/lib/localisation/messages/en.json';

type Messages = typeof en;

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages;
}
