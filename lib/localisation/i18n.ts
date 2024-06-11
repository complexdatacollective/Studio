import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES } from './locales';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!SUPPORTED_LOCALES.includes(locale)) notFound();

  return {
    //Todo: fix linting error here later
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
