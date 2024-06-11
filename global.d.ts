import type messages from './lib/localisation/messages/en.json';

type Messages = typeof messages;

declare global {
  // Use type safe message keys with `next-intl`
  // we could define the all types of messages here?
  type IntlMessages = Messages;
}
