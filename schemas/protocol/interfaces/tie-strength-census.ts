import { z } from 'zod';
import { StageTypeSchema } from './stages';

export const TieStrengthCensusSchema = z.object({
  type: StageTypeSchema.extract(['TieStrengthCensus']),
});
