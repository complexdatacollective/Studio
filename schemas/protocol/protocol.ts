import { z } from 'zod';
import { StageSchema } from './interfaces/stages';
import { CodebookSchema } from './codebook/codebook';
import { WaveSchema } from './wave';

export const AssetManifest = z.object({});

const ProtocolSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    stages: z.array(StageSchema),
    codebook: CodebookSchema,
    languages: z.array(z.string()), // first language is default
    // assetManifest: AssetManifestScheme.optional(),
    waves: z.array(WaveSchema).optional(),
  })
  // May not need this - will throw error if extra fields are present
  // when parsing.
  .strict();

export type Protocol = z.infer<typeof ProtocolSchema>;
