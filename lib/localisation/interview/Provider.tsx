'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { getBestMatch } from '../utils';
import { createLocalStorageStore } from '../../createLocalStorageStore';

export type Locale = [string, string];

type InterviewLocaleContextType = {
  locale: string;
  allInterviewLocales: Locale[];
  setLocale: (locale: string) => void;
};

const InterviewLocaleContext = createContext<
  InterviewLocaleContextType | undefined
>(undefined);

const useInterviewLocaleStore =
  createLocalStorageStore<string>('interviewLocale');

export default function InterviewLocaleProvider({
  userLanguageHeader,
  protocolLanguages,
  children,
}: {
  userLanguageHeader: string | null;
  protocolLanguages: Locale[];
  children: React.ReactNode;
}) {
  const { get: getStoredLocale, set: setStoredLocale } =
    useInterviewLocaleStore();
  const [locale, setLocale] = useState(() => getStoredLocale('current') ?? '');

  useEffect(() => {
    if (!userLanguageHeader) {
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
    setStoredLocale('current', bestMatch);

    setLocale(bestMatch);
  }, [userLanguageHeader, protocolLanguages, setStoredLocale]);

  const contextValue: InterviewLocaleContextType = {
    locale,
    allInterviewLocales: protocolLanguages,
    setLocale: (newLocale: string) => {
      setLocale(newLocale);
      setStoredLocale('current', newLocale);
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
