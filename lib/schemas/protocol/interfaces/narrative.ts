import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const NarrativeSchema = z.object({
  type: StageTypeSchema.extract(['Narrative']),
});
