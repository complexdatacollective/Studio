import { type ReactNode } from 'react';
import { type Locale } from '~/lib/localisation/locales';

export type Step = {
  // if targetElementId _not_ provided, render as a modal
  targetElementId?: string; // Should this be a ref, or just a string?
  content: Record<Locale, ReactNode>;
};
