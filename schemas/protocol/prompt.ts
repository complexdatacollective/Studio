import { z } from 'zod';
import { LocalisedStringSchema } from '~/schemas/shared';

export const PromptSchema = z.object({
  id: z.string(),
  text: LocalisedStringSchema, // TODO: update to support rich text via LocalisedRecordSchema
  // Todo:
  // additionalAttributes: z.any().optional(),
  // variable: z.string().optional(),
  // edgeVariable: z.string().optional(),
  // negativeLabel: z.string().optional(),
  // otherVariable: z.string().optional(),
  // otherVariablePrompt: z.string().optional(),
  // otherOptionLabel: z.string().optional(),
  // bucketSortOrder: z.array(z.any()).optional(),
  // binSortOrder: z.array(z.any()).optional(),
  // sortOrder: z.array(z.any()).optional(),
  // color: z.string().optional(),
  // layout: z.any().optional(),
  // edges: z.any().optional(),
  // highlight: z.any().optional(),
  // createEdge: z.string().optional(),
});

export type Prompt = z.infer<typeof PromptSchema>;
