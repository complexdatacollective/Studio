import { z } from 'zod';
import { EntityTypeSchema } from './entities';
import { SupportedLocaleSchema } from './i18n';
import { StageGroupSchema } from './interfaces/stages';
import { VariableDefinitionSchema } from './variables';

// Schema to represent strings that can be safely encoded in CSV and graphML. Used as
// keys in various places. Must comply with `NMTOKEN` in XML spec.
export const EncodableKeyString = z.string().regex(/^[a-zA-Z0-9._:-]+$/);

const ProtocolSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    languages: z.array(SupportedLocaleSchema),
    stages: StageGroupSchema,
    variables: z
      .record(EncodableKeyString, VariableDefinitionSchema)
      .optional(),
    entities: z.record(EncodableKeyString, EntityTypeSchema).optional(),
  })
  // May not need this - will throw error if extra fields are present
  // when parsing.
  .strict();

export type Protocol = z.infer<typeof ProtocolSchema>;
