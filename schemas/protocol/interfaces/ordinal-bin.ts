import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const OrdinalBinSchema = z.object({
  type: StageTypeSchema.extract(['OrdinalBin']),
});
