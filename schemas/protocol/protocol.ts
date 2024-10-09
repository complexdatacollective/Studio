import { z } from 'zod';
import { StageSchema } from './interfaces/stages';
import { CodebookSchema } from './codebook/codebook';
import {
  LocalisedMessagesWithDefaultsSchema,
  SupportedLocaleSchema,
} from './i18n';

export const AssetManifest = z.object({});

const ProtocolSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    // Hack to work around this: https://github.com/colinhacks/zod/issues/2376
    languages: z.array(SupportedLocaleSchema),
    // localisedStrings: LocalisedStringsWithDefaultsSchema,
    stages: z.array(StageSchema.or(z.array(StageSchema))),
    codebook: CodebookSchema,
  })
  // May not need this - will throw error if extra fields are present
  // when parsing.
  .strict();

export type Protocol = z.infer<typeof ProtocolSchema>;
