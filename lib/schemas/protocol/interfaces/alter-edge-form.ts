import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const AlterEdgeFormSchema = z.object({
  type: StageTypeSchema.extract(['AlterEdgeForm']),
});
