import type { Protocol } from '~/schemas/protocol/protocol';

const devProtocol: Protocol = {
  name: 'Dev Protocol',
  languages: ['ar'],
  localisedStrings: {
    en: {
      Stages: {
        '1': {
          label: 'Name Generator',
          Prompts: {
            '1': 'Who are your classmates at {school}?',
            '2': 'What are the names of your family members?',
          },
        },
      },
    },
    es: {
      Stages: {
        '1': {
          label: 'Generador de Nombres',
          Prompts: {
            '1': '¿Quiénes son tus compañeros de clase en {school}?',
            '2': '¿Cuáles son los nombres de tus familiares?',
          },
        },
      },
    },
  },
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
      subject: {
        entity: 'node',
        id: 'person',
      },
      mode: 'quickAdd',
      quickAddVariable: 'person',
      prompts: [
        {
          id: '1',
          injectedVariables: ['school'],
        },
      ],
    },
  ],
};

export default devProtocol;
