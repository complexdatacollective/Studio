import type { Protocol } from '~/schemas/protocol/protocol';

export const devProtocol: Protocol = {
  name: 'Dev Protocol',
  languages: ['en-GB', 'es', 'ar'],
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
        ar: 'عائلتي',
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
            ar: 'الرجاء سرد جميع أفراد العائلة الذين تعيش معهم',
          },
        },
        {
          id: 'family-ng-prompt-2',
          text: {
            en: 'Please list all of your other family members',
            es: 'Por favor, enumere a todos sus otros familiares',
            ar: 'الرجاء سرد جميع أفراد عائلتك الآخرين',
          },
        },
      ],
      panels: [
        {
          id: 'family-ng-panel-1',
          title: {
            en: 'People from your last interview',
            es: 'Personas de tu última entrevista',
            ar: 'الأشخاص من آخر مقابلة لك',
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
  ],
};

export default devProtocol;
