import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const AlterFormSchema = z.object({
  type: StageTypeSchema.extract(['AlterForm']),
});
