import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES } from './locales';
import { type AbstractIntlMessages } from 'next-intl';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  const messages = (
    (await import(`./messages/${locale}.json`)) as {
      default: AbstractIntlMessages | undefined;
    }
  ).default;

  return {
    messages,
  };
});
