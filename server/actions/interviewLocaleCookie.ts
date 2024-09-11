'use server';
import { cookies } from 'next/headers';

// sets an interviewLocale cookie
export async function setInterviewLocale(locale: string) {
  cookies().set('interviewLocale', locale);
}
