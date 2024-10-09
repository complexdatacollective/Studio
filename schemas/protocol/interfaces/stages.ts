import { z } from 'zod';
import { SkipDefinitionSchema } from '../shared/filter';
import { NameGeneratorInterfaceSchema } from './name-generator';
import { SociogramSchema } from './sociogram';
import { InformationSchema } from './information';
import { OrdinalBinSchema } from './ordinal-bin';
import { CategoricalBinSchema } from './categorical-bin';
import { NarrativeSchema } from './narrative';
import { AlterFormSchema } from './alter-form';
import { EgoFormSchema } from './ego-form';
import { AlterEdgeFormSchema } from './alter-edge-form';
import { DyadCensusSchema } from './dyad-census';
import { OneToManyCensusSchema } from './one-to-many-census';
import { TieStrengthCensusSchema } from './tie-strength-census';
import { LocalisedStringSchema } from '~/schemas/shared';
import { SupportedLocaleSchema } from '../i18n';
import { StepSchema } from '../shared/wizards';

export const StageTypeSchema = z.enum([
  'NameGenerator',
  'Sociogram',
  'Information',
  'OrdinalBin',
  'CategoricalBin',
  'Narrative',
  'AlterForm',
  'EgoForm',
  'AlterEdgeForm',
  'DyadCensus',
  'OneToManyCensus',
  'TieStrengthCensus',
]);

const BaseStageSchema = z.object({
  id: z.string(),
  label: LocalisedStringSchema,
  interviewScript: z.string().optional(),
  skipLogic: SkipDefinitionSchema.optional(),
  wizard: z.record(SupportedLocaleSchema, z.array(StepSchema)).optional(),
});

export const StageSchema = z
  .union([
    NameGeneratorInterfaceSchema,
    SociogramSchema,
    InformationSchema,
    OrdinalBinSchema,
    CategoricalBinSchema,
    NarrativeSchema,
    AlterFormSchema,
    EgoFormSchema,
    AlterEdgeFormSchema,
    DyadCensusSchema,
    OneToManyCensusSchema,
    TieStrengthCensusSchema,
  ])
  .and(BaseStageSchema);

export type Stage = z.infer<typeof StageSchema>;
