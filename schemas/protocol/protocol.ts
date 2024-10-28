import { z } from 'zod';
import { CodebookSchema } from './codebook/codebook';
import { VariableDefinitionSchema } from './codebook/variables';
import { SupportedLocaleSchema } from './i18n';
import { StagesSchema } from './interfaces/stages';

// Schema to represent strings that can be safely encoded in CSV and graphML. Used as
// keys in various places. Must comply with `NMTOKEN` in XML spec.
const EncodableString = z.string().regex(/^[a-zA-Z0-9._:-]+$/);

const ProtocolSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    languages: z.array(SupportedLocaleSchema),
    stages: StagesSchema,
    codebook: CodebookSchema,
    variables: z.record(EncodableString, VariableDefinitionSchema).optional(),
  })
  // May not need this - will throw error if extra fields are present
  // when parsing.
  .strict();

export type Protocol = z.infer<typeof ProtocolSchema>;
