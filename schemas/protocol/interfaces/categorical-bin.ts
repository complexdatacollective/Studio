import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const CategoricalBinSchema = z.object({
  type: StageTypeSchema.extract(['CategoricalBin']),
});
