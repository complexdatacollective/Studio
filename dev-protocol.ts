import type { Protocol } from './schemas/protocol/protocol';

const devProtocol: Protocol = {
  name: 'Dev Protocol',
  languages: ['en', 'es'],
  codebook: {
    ego: {
      variables: {
        school: {
          type: 'text',
        },
      },
    },
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
      school: {
        variables: {
          name: {
            type: 'text',
          },
        },
        color: 'seq-node-2',
        icon: 'Backpack', // example of using lucide icon
      },
    },
  },
  waves: [
    {
      id: '1',
      label: 'Baseline',
    },
    {
      id: '2',
      label: '6 month follow-up',
    },
  ],
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
            DEFAULT: 'Who are your classmates at {school}?',
          },
          injectedVariables: ['school'],
        },
      ],
    },
    {
      id: '2',
      type: 'Sociogram',
      label: 'Count & ability to skip to specific stage',
      skipLogic: {
        action: 'SKIP',
        filter: {
          join: 'AND',
          rules: [
            {
              operator: 'COUNT',
              count: 3,
              type: 'ego',
              entityId: 'person',
              id: '1',
            },
          ],
        },
        targetStage: '4', // skip here if count condition is met
      },
    },
    {
      id: '3',
      type: 'Sociogram',
      label: 'Branching Filter Example',
      skipLogic: {
        action: 'SHOW',
        filter: {
          join: 'AND',
          rules: [
            {
              operator: 'INCLUDES',
              entityVariable: 'name',
              value: 'John',
              type: 'node',
              entityId: 'person',
              id: '1',
            },
          ],
        },
        stagesToShow: ['7', '8'],
      },
    },
  ],
};

export default devProtocol;
