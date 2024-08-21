import { z } from 'zod';
import { StageSchema } from './interfaces/stages';
import { CodebookSchema } from './codebook/codebook';

export const AssetManifest = z.object({});

const ProtocolSchema = z
  .object({
    name: z.string(),
    description: z.string().optional(),
    stages: z.array(StageSchema),
    codebook: CodebookSchema,
    // assetManifest: AssetManifestScheme.optional(),
  })
  // May not need this - will throw error if extra fields are present
  // when parsing.
  .strict();

export type Protocol = z.infer<typeof ProtocolSchema>;

const devProtocol: Protocol = {
  name: 'Dev Protocol',
  codebook: {
    nodes: {
      person: {
        variables: {
          name: {
            type: 'text',
          },
          age: {
            type: 'number',
          },
        },
        color: 'seq-node-1',
        icon: 'add-a-person',
      },
    },
  },
  stages: [
    {
      id: '1',
      type: 'NameGenerator',
      label: 'Name Generator',
      subject: {
        entity: 'node',
        id: 'person',
      },
      mode: 'quickAdd',
      quickAddVariable: 'person',
      prompts: [
        {
          id: '1',
          text: {
            en: 'What is the name of the person?',
          },
        },
      ],
    },
    {
      id: '2',
      type: 'Sociogram',
      label: 'Sociogram',
    },
  ],
};

export default devProtocol;
