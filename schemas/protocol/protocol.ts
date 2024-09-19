import { z } from 'zod';
import { StageSchema } from './interfaces/stages';
import { CodebookSchema } from './codebook/codebook';
import { WaveSchema } from './wave';
import { SupportedLocalesSchema } from '~/lib/localisation/config';

export const AssetManifest = z.object({});

const ProtocolSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    // Hack to work around this: https://github.com/colinhacks/zod/issues/2376
    languages: z.array(SupportedLocalesSchema),
    localisedStrings: z.record(SupportedLocalesSchema, z.unknown()),
    stages: z.array(StageSchema.or(z.array(StageSchema))),
    codebook: CodebookSchema,
    waves: z.array(WaveSchema).optional(),
  })
  // May not need this - will throw error if extra fields are present
  // when parsing.
  .strict();

export type Protocol = z.infer<typeof ProtocolSchema>;
