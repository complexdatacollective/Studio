import { z } from 'zod';

// Utility for protocol keys that must support localisation.
// TODO: currently extends app supported locales, but should
// be extended to support all possible locales.
export const LocalisedRecord = z.record(z.string(), z.string());
