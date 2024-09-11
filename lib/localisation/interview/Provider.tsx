'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { getBestMatch } from '../utils';
import { setInterviewLocale } from '~/server/actions/interviewLocaleCookie';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '~/lib/localisation/navigation';
import { SUPPORTED_LOCALES } from '~/lib/localisation/locales';

export type Locale = [string, string];

type InterviewLocaleContextType = {
  locale: string;
  allInterviewLocales: Locale[];
  setLocale: (locale: string) => void;
};

const InterviewLocaleContext = createContext<
  InterviewLocaleContextType | undefined
>(undefined);

export default function InterviewLocaleProvider({
  initialLocale,
  userLanguageHeader,
  protocolLanguages,
  children,
}: {
  initialLocale: string | null;
  userLanguageHeader: string | null;
  protocolLanguages: Locale[];
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState(initialLocale);

  const currentNextIntlLocale = useLocale() as unknown as Locale;
  const pathname = usePathname();
  const router = useRouter();

  // integrate with next-intl
  // if locale matches a next-intl locale, set that
  // todo: what to do if not? default to 'en'?
  useEffect(() => {
    if (
      locale &&
      locale !== currentNextIntlLocale &&
      SUPPORTED_LOCALES.includes(locale) // interview locale is also a supported UI locale
    ) {
      // set next-intl locale
      console.log('setting next-intl locale', locale);

      router.push(pathname, { locale });
    }
  }, [currentNextIntlLocale, locale, pathname, router]);

  useEffect(() => {
    if (!userLanguageHeader) {
      return;
    }

    // early return if we already have a locale cookie.
    if (initialLocale) {
      return;
    }

    const cleanedUserLocales = userLanguageHeader
      .split(',')
      .map((locale) => locale.split(';')[0].trim())
      .filter((locale) => /^[a-zA-Z-]+$/.test(locale));

    const bestMatch = getBestMatch(
      protocolLanguages.map(([code]) => code),
      cleanedUserLocales,
    );

    // store best match
    // call setInterviewLocale server action
    void setInterviewLocale(bestMatch);

    setLocale(bestMatch);
  }, [userLanguageHeader, protocolLanguages, initialLocale]);

  const contextValue: InterviewLocaleContextType = {
    locale: locale ?? 'DEFAULT',
    allInterviewLocales: protocolLanguages,
    setLocale: (newLocale: string) => {
      setLocale(newLocale);
      void setInterviewLocale(newLocale);
    },
  };

  return (
    <InterviewLocaleContext.Provider value={contextValue}>
      {children}
    </InterviewLocaleContext.Provider>
  );
}

export function useInterviewLocale() {
  const context = useContext(InterviewLocaleContext);
  if (context === undefined) {
    throw new Error(
      'useInterviewLocale must be used within an InterviewLocaleProvider',
    );
  }
  return context;
}
