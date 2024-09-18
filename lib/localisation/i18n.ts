/* eslint-disable no-console */
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { type Locale, MAIN_LOCALES, SUPPORTED_LOCALES } from './config';
import {
  type IntlError,
  IntlErrorCode,
  type AbstractIntlMessages,
} from 'next-intl';
import { customErrorLogger, isInterviewRoute } from './utils';
import { headers, cookies } from 'next/headers';

export const getMessageFallback = ({
  namespace,
  key,
  error,
}: {
  namespace?: string;
  key?: string;
  error: IntlError;
}) => {
  const path = [namespace, key].filter((part) => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `⚠️ ${path}`;
  } else {
    return 'Dear developer, please fix this message: ' + path;
  }
};

export async function fetchInterviewMessages(
  locale: Locale,
  interviewId: string,
): Promise<AbstractIntlMessages> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/interview/${interviewId}/messages?locale=${locale}`,
    );
    if (!response.ok) {
      console.error('Failed to fetch messages:', response.statusText);
      return [];
    }
    const data = await response.json();

    return data.messages;
  } catch (error) {
    console.error('Error fetching protocol messages:', error);
    return [];
  }
}
