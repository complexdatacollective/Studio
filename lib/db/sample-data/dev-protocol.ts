import type { Protocol } from '~/schemas/protocol/protocol';

export const devProtocol: Protocol = {
  name: 'Dev Protocol',
  languages: ['en-GB', 'es', 'ar'],
  variables: {
    name: {
      type: 'text',
      label: {
        en: 'Name',
        es: 'Nombre',
        ar: 'الاسم',
      },
      validation: {
        // TODO: should validation go here, or with the form?
        required: true,
      },
      control: 'text',
    },
    age: {
      type: 'number',
      label: {
        en: 'Age',
        es: 'Edad',
        ar: 'العمر',
      },
      validation: {
        required: true,
      },
    },
    school: {
      type: 'categorical',
      label: {
        en: 'School',
        es: 'Escuela',
        ar: 'المدرسة',
      },
      options: [
        { value: 'Northwestern', label: 'Northwestern' },
        { value: 'U Chicago', label: 'U Chicago' },
      ],
      control: 'checkboxGroup',
    },
  },
  forms: {
    familyMember: [
      {
        variable: 'name',
        label: {
          en: 'Name',
          es: 'Nombre',
          ar: 'الاسم',
        },
        hint: {
          en: 'Enter the name of the family member',
          es: 'Ingrese el nombre del miembro de la familia',
          ar: 'أدخل اسم أحد أفراد العائلة',
        },
      },
      {
        variable: 'age',
        label: {
          en: 'Age',
          es: 'Edad',
          ar: 'العمر',
        },
      },
      {
        condition: {
          action: 'SHOW',
          rule: {
            field: 'age',
            operator: 'GREATER_THAN_OR_EQUAL',
            value: 18,
          },
        },
        elements: [
          {
            variable: 'workplace',
            label: {
              en: 'Workplace',
              es: 'Lugar de trabajo',
              ar: 'مكان العمل',
            },
          },
        ],
      },
    ],
  },
  entities: {
    person: {
      label: 'Person',
      type: 'node',
      icon: 'user-round',
      color: 'node-1',
    },
    knows: {
      label: 'Knows',
      type: 'edge',
      color: 'edge-1',
      directed: false,
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
      creates: 'person',
      mode: 'form',
      form: 'familyMember',
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
          source: {
            type: 'previousVisit',
            visit: 1,
          },
          filter: {
            type: 'node',
            entity: 'person',
            variable: 'type',
            operator: 'EXACTLY',
            value: 'family',
          },
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
