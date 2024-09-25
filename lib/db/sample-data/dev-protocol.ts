import type { Protocol } from '~/schemas/protocol/protocol';

export const devProtocol: Protocol = {
  name: 'Dev Protocol',
  languages: ['en-GB', 'fr', 'es'],
  localisedStrings: {
    'en-GB': {
      Protocol: {
        Stages: {
          '1': {
            Label: 'Name Generator',
          },
        },
        Prompts: {
          '1': 'Who are your classmates at school?',
          '2': 'What are the names of your family members?',
        },
        Panels: {
          '1': {
            Title: 'People you have already mentioned',
          },
          '2': {
            Title: 'People from your last interview',
          },
        },
      },
    },
    'es': {
      Protocol: {
        Stages: {
          '1': {
            Label: 'Generador de Nombres',
          },
        },
        Prompts: {
          '1': '¿Quiénes son tus compañeros de clase en school?',
          '2': '¿Cuáles son los nombres de tus familiares?',
        },
        Panels: {
          '1': {
            Title: 'Personas que ya has mencionado',
          },
          '2': {
            Title: 'Personas de tu última entrevista',
          },
        },
      },
    },
    'fr': {
      Protocol: {
        Stages: {
          '1': {
            Label: 'Générateur de noms',
          },
        },
        Prompts: {
          '1': 'Qui sont vos camarades de classe à school?',
          '2': 'Quels sont les noms de vos membres de famille?',
        },
        Panels: {
          '1': {
            Title: 'Personnes que vous avez déjà mentionnées',
          },
          '2': {
            Title: 'Personnes de votre dernière interview',
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
        },
      ],
    },
  ],
};

export default devProtocol;
