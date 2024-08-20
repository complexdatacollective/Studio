import { z } from 'zod';

export const AssetManifest = z.object({});

export const Field = z.object({
  variable: z.string(),
  prompt: z.string(),
});

export const Form = z
  .object({
    title: z.string(),
    fields: z.array(Field),
  })
  .nullable();

export const QuickAdd = z.object({
  type: z.string().optional(),
});

export const CreateEdge = z.object({
  type: z.string().optional(),
});

export const Subject = z.object({
  entity: z.object({
    id: z.string(),
    type: z.string(),
  }),
  type: z.string(),
});

export const Panel = z.object({
  id: z.string(),
  title: z.string(),
  filter: z.any().nullable(),
  dataSource: z.string().nullable(),
});

export const Rule = z.object({
  type: z.enum(['alter', 'ego', 'edge']),
  id: z.string(),
  options: z
    .object({
      type: z.string(),
      attribute: z.string(),
      operator: z.enum([
        'EXISTS',
        'NOT_EXISTS',
        'EXACTLY',
        'NOT',
        'GREATER_THAN',
        'GREATER_THAN_OR_EQUAL',
        'LESS_THAN',
        'LESS_THAN_OR_EQUAL',
        'INCLUDES',
        'EXCLUDES',
        'OPTIONS_GREATER_THAN',
        'OPTIONS_LESS_THAN',
        'OPTIONS_EQUALS',
        'OPTIONS_NOT_EQUALS',
        'CONTAINS',
        'DOES NOT CONTAIN',
        'COUNT',
      ]),
      value: z
        .union([z.number(), z.string(), z.boolean(), z.array(z.any())])
        .optional(),
    })
    .refine((data) => {
      if (
        [
          'EXACTLY',
          'NOT',
          'GREATER_THAN',
          'GREATER_THAN_OR_EQUAL',
          'LESS_THAN',
          'LESS_THAN_OR_EQUAL',
          'INCLUDES',
          'EXCLUDES',
          'OPTIONS_GREATER_THAN',
          'OPTIONS_LESS_THAN',
          'OPTIONS_EQUALS',
          'OPTIONS_NOT_EQUALS',
          'CONTAINS',
          'DOES NOT CONTAIN',
        ].includes(data.operator)
      ) {
        return data.value !== undefined;
      }
      return true;
    }),
});

export const Filter = z
  .object({
    join: z.enum(['OR', 'AND']),
    rules: z.array(Rule),
  })
  .nullable();

export const Prompt = z.object({
  id: z.string(),
  text: z.string(),
  additionalAttributes: z.any().optional(),
  variable: z.string().optional(),
  edgeVariable: z.string().optional(),
  negativeLabel: z.string().optional(),
  otherVariable: z.string().optional(),
  otherVariablePrompt: z.string().optional(),
  otherOptionLabel: z.string().optional(),
  bucketSortOrder: z.array(z.any()).optional(),
  binSortOrder: z.array(z.any()).optional(),
  sortOrder: z.array(z.any()).optional(),
  color: z.string().optional(),
  layout: z.any().optional(),
  edges: z.any().optional(),
  highlight: z.any().optional(),
  createEdge: z.string().optional(),
});

export const Preset = z.object({
  id: z.string(),
  label: z.string(),
  layoutVariable: z.string(),
  groupVariable: z.string().optional(),
  edges: z.any().optional(),
  highlight: z.any().optional(),
});

export const Background = z.object({
  image: z.string().optional(),
  concentricCircles: z.number().optional(),
  skewedTowardCenter: z.boolean().optional(),
});

export const SortOrder = z.object({
  property: z.string(),
  direction: z.any(),
  type: z.enum(['string', 'number', 'boolean', 'date', 'hierarchy']),
  hierarchy: z.array(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export const SortOptions = z.object({
  sortOrder: z.array(SortOrder),
  sortableProperties: z.array(
    z.object({
      label: z.string(),
      variable: z.string(),
    }),
  ),
});

export const CardOptions = z.object({
  displayLabel: z.string().optional(),
  additionalProperties: z
    .array(
      z.object({
        label: z.string(),
        variable: z.string(),
      }),
    )
    .optional(),
});

export const SearchOptions = z.object({
  fuzziness: z.number(),
  matchProperties: z.array(z.string()),
});

export const Behaviors = z.object({
  minNodes: z.number().optional(),
  maxNodes: z.number().optional(),
  freeDraw: z.boolean().optional(),
  featureNode: z.boolean().optional(),
  allowRepositioning: z.boolean().optional(),
  automaticLayout: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
});

export const Codebook = z.object({
  node: z.any().optional(),
  edge: z.any().optional(),
  ego: z.any().optional(),
});

export const IntroductionPanel = z.object({
  title: z.string(),
  text: z.string(),
});

export const SkipLogic = z.object({
  action: z.enum(['SHOW', 'SKIP']),
  filter: Filter,
});

export const Variable = z.object({
  name: z.string().regex(/^[a-zA-Z0-9._:-]+$/),
  type: z.enum([
    'boolean',
    'text',
    'number',
    'datetime',
    'ordinal',
    'scalar',
    'categorical',
    'layout',
    'location',
  ]),
  component: z.enum([
    'Boolean',
    'CheckboxGroup',
    'Number',
    'RadioGroup',
    'Text',
    'TextArea',
    'Toggle',
    'ToggleButtonGroup',
    'Slider',
    'VisualAnalogScale',
    'LikertScale',
    'DatePicker',
    'RelativeDatePicker',
  ]),
  options: z.array(z.any()).optional(),
  parameters: z.any().optional(),
  validation: z.any().optional(),
});

export const Stage = z.object({
  id: z.string(),
  interviewScript: z.string().optional(),
  type: z.enum([
    'Narrative',
    'AlterForm',
    'AlterEdgeForm',
    'EgoForm',
    'NameGenerator',
    'NameGeneratorQuickAdd',
    'NameGeneratorRoster',
    'Sociogram',
    'DyadCensus',
    'TieStrengthCensus',
    'Information',
    'OrdinalBin',
    'CategoricalBin',
  ]),
  label: z.string(),
  form: Form.optional(),
  quickAdd: QuickAdd.optional(),
  createEdge: CreateEdge.optional(),
  dataSource: z.string().optional(),
  subject: Subject.optional(),
  panels: z.array(Panel).optional(),
  prompts: z.array(Prompt).optional(),
  presets: z.array(Preset).optional(),
  background: Background.optional(),
  sortOptions: SortOptions.optional(),
  cardOptions: CardOptions.optional(),
  searchOptions: SearchOptions.optional(),
  behaviors: Behaviors.optional(),
  showExistingNodes: z.boolean().optional(),
  title: z.string().optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        type: z.enum(['text', 'asset']),
        content: z.string(),
        description: z.string().optional(),
        size: z.string().optional(),
        loop: z.boolean().optional(),
      }),
    )
    .optional(),
  introductionPanel: IntroductionPanel.optional(),
  skipLogic: SkipLogic.optional(),
  filter: Filter.optional(),
});

export const Protocol = z.object({
  name: z.string(),
  description: z.string().optional(),
  lastModified: z.string().datetime(),
  schemaVersion: z.number(),
  codebook: Codebook,
  assetManifest: AssetManifest.optional(),
  stages: z.array(Stage),
});

export const Node = z.object({
  name: z.string(),
  displayVariable: z.string(),
  iconVariant: z.string(),
  variables: z.array(Variable),
  color: z.string(),
  glyph: z.string().optional(), // node glyph options - including images?
});

export const Edge = z.object({
  name: z.string(),
  variables: z.array(Variable),
  color: z.string(),
  from: z.string(),
  to: z.string(),
  directed: z.boolean(), // directed edges
});

// -------

const ProtocolSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  lastModified: z.string().datetime(),
  schemaVersion: z.number(),
  stages: z.array(StageSchema),
  codebook: CodebookSchema,
  assetManifest: AssetManifestScheme.optional(),
});

export type Protocol = z.infer<typeof Protocol>;

const devProtocol: Protocol = {};

export default devProtocol;
