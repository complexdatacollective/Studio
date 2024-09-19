/* eslint-disable @typescript-eslint/consistent-type-definitions */
import 'react';
import type en from '~/lib/localisation/messages/en.json';

type Messages = typeof en;

type ProtocolMessages = {
  Stages: Record<
    string,
    {
      Prompts: Record<string, string>;
      Panels: Record<
        string,
        {
          Title: string;
        }
      >;
    }
  >;
};

declare global {
  // Use type safe message keys with `next-intl`
  type IntlMessages = Messages & ProtocolMessages;
}
