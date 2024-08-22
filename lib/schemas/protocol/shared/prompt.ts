import { z } from 'zod';
import { LocalisedRecord } from '../../shared';

// prompt variables for injection
const PromptVariableSchema = z.object({
  name: z.string(),
  value: z.string().optional(),
});

export const PromptSchema = z.object({
  id: z.string(),
  text: LocalisedRecord,
  variables: z.array(PromptVariableSchema).optional(),
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

export type TPrompt = z.infer<typeof PromptSchema>;

export const PromptsSchema = z.array(PromptSchema);

export type TPrompts = z.infer<typeof PromptsSchema>;
