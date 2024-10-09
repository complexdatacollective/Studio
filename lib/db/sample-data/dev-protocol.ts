import type { Protocol } from '~/schemas/protocol/protocol';

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
      wizard: {
        en: [
          {
            title: 'Welcome',
            content: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Welcome to the family name generator',
                  },
                ],
              },
            ],
          },
        ],
      },
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
