import { z } from 'zod';
import { StageSchema } from './interfaces/stages';
import { CodebookSchema } from './codebook/codebook';
import { SupportedLocaleSchema } from './i18n';

const ProtocolSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    languages: z.array(SupportedLocaleSchema),
    stages: z.array(StageSchema.or(z.array(StageSchema))),
    codebook: CodebookSchema,
  })
  // May not need this - will throw error if extra fields are present
  // when parsing.
  .strict();

export type Protocol = z.infer<typeof ProtocolSchema>;
