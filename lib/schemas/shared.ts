import { z } from 'zod';

// Utility for protocol keys that must support localisation.
// It is required that a DEFAULT key is present, since this will be used as the
// fallback value if a localised key is not found.
export const LocalisedRecord = z
  .object({
    DEFAULT: z.string(),
  })
  .and(z.record(z.string()));

export type LocalisedRecord = z.infer<typeof LocalisedRecord>;
