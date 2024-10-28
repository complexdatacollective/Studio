/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';
import { LocalisedStringSchema } from '~/schemas/shared';
import { SupportedLocaleSchema } from '../i18n';
import { SkipDefinitionWithTargetSchema } from '../logic';
import { StepSchema } from '../wizards';
import { AlterEdgeFormSchema } from './alter-edge-form';
import { AlterFormSchema } from './alter-form';
import { CategoricalBinSchema } from './categorical-bin';
import { DyadCensusSchema } from './dyad-census';
import { EgoFormSchema } from './ego-form';
import { InformationSchema } from './information';
import { NameGeneratorInterfaceSchema } from './name-generator';
import { NarrativeSchema } from './narrative';
import { OneToManyCensusSchema } from './one-to-many-census';
import { OrdinalBinSchema } from './ordinal-bin';
import { SociogramSchema } from './sociogram';
import { TieStrengthCensusSchema } from './tie-strength-census';

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
  skipLogic: SkipDefinitionWithTargetSchema.optional(),
  wizard: z.record(SupportedLocaleSchema, z.array(StepSchema)).optional(),
});

export const SingleStageSchema = z
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

export type SingleStage = z.infer<typeof SingleStageSchema>;

type StageItem = SingleStage | Stages;

export type Stages =
  | {
      label: string;
      stages: StageItem[];
    }
  | StageItem[];

export const StageGroupSchema: z.ZodType<StageItem> = z.union([
  z.object({
    label: z.string(),
    stages: z.array(z.lazy(() => StageGroupSchema)),
  }),
  z.array(SingleStageSchema),
]);

/**
 * Examples
 */

/**
 * You
 */
const stages: Stages = [
  {
    id: '1',
    label: { en: 'Example' },
    type: 'Information',
  },
];

/**
 * Showing nesting of groups of stages
 */

const nestedStages: Stages = [
  {
    id: '1',
    label: { en: 'Example' },
    type: 'Information',
  },
  {
    label: 'My Group of Stages',
    stages: [
      {
        id: '2',
        label: { en: 'Example' },
        type: 'Information',
      },
      {
        id: '3',
        label: { en: 'Example' },
        type: 'Information',
      },
      {
        label: 'Another group',
        stages: [
          {
            id: '4',
            label: { en: 'Example' },
            type: 'Information',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    label: { en: 'Example' },
    type: 'Information',
  },
];
