import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES } from './locales';
import { isIn } from '../utils';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!isIn(SUPPORTED_LOCALES, locale)) notFound();

  return {
    //Todo: fix linting error here later
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
