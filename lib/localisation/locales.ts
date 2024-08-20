import { z } from 'zod';

export const LocalesDictSchema = z
  .object({
    en: z.literal('English'),
    es: z.literal('Español'),
    ar: z.literal('عربي'),
  })
  .strict();

export const SUPPORTED_LOCALES = [...LocalesDictSchema.keyof().options];

export type TSupportedLocales = typeof SUPPORTED_LOCALES;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
