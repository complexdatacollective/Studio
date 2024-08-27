import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const EgoFormSchema = z.object({
  type: StageTypeSchema.extract(['EgoForm']),
});
