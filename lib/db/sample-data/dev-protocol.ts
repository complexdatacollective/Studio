import type { Protocol } from '~/schemas/protocol/protocol';

const localisedStrings = {
  'en-GB': {
    Stages: {
      '1': {
        Label: 'Classmates and Family',
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
  'es': {
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
  'fr': {
    Protocol: {
      Stages: {
        '1': {
          Label: 'Générateur de noms',
          Wizard: {
            Name: 'French wizard stage specific override',
            Description: 'Description!',
            Steps: {
              Welcome: {
                Title: 'Title - Welcome override',
                Text: 'Stage specific override',
              },
              Prompts: {
                Title: 'Title - Prompts override',
                Text: 'Stage specific override',
              },
              SidePanels: {
                Title: 'Title - Side Panels override',
                Text: 'Stage specific override',
              },
              AddPerson: {
                Title: 'Title - Add Person override',
                Text: 'Stage specific override',
              },
            },
          },
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
    Interview: {
      Wizards: {
        General: {
          Name: "Informations générales sur l'entretien",
          Description: "Description de l'étape",
          Steps: {
            Welcome: {
              Title: 'Bienvenue',
              Text: "Bienvenue dans l'entretien",
            },
          },
        },
      },
    },
  },
};

export const devProtocol: Protocol = {
  name: 'Dev Protocol',
  languages: ['en-GB', 'ar'],
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
        color: 'node-1',
        icon: 'user-round',
      },
      school: {
        variables: {
          name: {
            type: 'text',
          },
        },
        color: 'node-2',
        icon: 'backpack',
      },
    },
  },
  stages: [
    {
      id: 'family-ng',
      label: {
        en: 'My Family',
        es: 'Mi Familia',
        fr: 'Ma Famille',
      },
      type: 'NameGenerator',
      subject: {
        entity: 'node',
        id: 'person',
      },
      mode: 'quickAdd',
      quickAddVariable: 'person',
      prompts: [
        {
          id: 'family-ng-prompt-1',
          text: {
            en: 'Please list all the family members that you live with',
            es: 'Por favor, enumere todos los miembros de la familia con los que vive',
            fr: 'Veuillez lister tous les membres de la famille avec lesquels vous vivez',
          },
        },
        {
          id: 'family-ng-prompt-2',
          text: {
            en: 'Please list all of your other family members',
            es: 'Por favor, enumere a todos sus otros familiares',
            fr: 'Veuillez lister tous vos autres membres de la famille',
          },
        },
      ],
      panels: [
        {
          id: 'family-ng-panel-1',
          title: {
            en: 'People from your last interview',
            es: 'Personas de tu última entrevista',
            fr: 'Personnes de votre dernière interview',
          },
          source: 'previousVisit',
        },
      ],
    },
    {
      id: 'school-ng',
      label: {
        en: 'School',
        es: 'Escuela',
        fr: 'École',
      },
      type: 'NameGenerator',
      subject: {
        entity: 'node',
        id: 'school',
      },
      mode: 'quickAdd',
      quickAddVariable: 'school',
      prompts: [
        {
          id: 'school-ng-prompt-1',
          text: {
            en: 'Who are your classmates at school?',
            es: '¿Quiénes son tus compañeros de clase en school?',
            fr: 'Qui sont vos camarades de classe à school?',
          },
        },
      ],
      panels: [
        {
          id: 'school-ng-panel-1',
          title: {
            en: 'People you have already mentioned',
            es: 'Personas que ya has mencionado',
            fr: 'Personnes que vous avez déjà mentionnées',
          },
          source: 'currentNetwork',
        },
        {
          id: 'school-ng-panel-2',
          title: {
            en: 'People from your last interview',
            es: 'Personas de tu última entrevista',
            fr: 'Personnes de votre dernière interview',
          },
          source: 'previousVisit',
        },
      ],
    },
  ],
};

export default devProtocol;
