import { z } from 'zod';
import { LocalesDictSchema } from '../localisation/locales';

// Utility for protocol keys that must support localisation.
// TODO: currently extends app supported locales, but should
// be extended to support all possible locales.
export const LocalisedRecord = z.record(
  z.enum([...LocalesDictSchema.keyof().options]),
  z.string(),
);
