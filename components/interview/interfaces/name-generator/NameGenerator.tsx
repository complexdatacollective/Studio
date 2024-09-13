/**
 * Building blocks for NameGenerator interface
 */

import Prompts from '~/components/interview/Prompts/Prompts';
import NodePanels from './NodePanels';
import NodeList from '~/components/interview/NodeList';
import QuickNodeForm from './QuickNodeForm';
import { cn } from '~/lib/utils';
import { interfaceWrapperClasses } from '../../ui/SimpleShell';
import { withOnboardingWizard } from '~/components/onboard-wizard/withOnboardingWizard';

const demoPrompts = [
  {
    id: 0,
    text: 'Within the past 6 months, who have you felt close to, or discussed important personal matters with?',
  },
  {
    id: 1,
    text: 'Who do you feel most comfortable with?',
  },
];

const demoPanels = [
  {
    id: '1',
    title: 'People you have already mentioned',
    nodes: [
      {
        id: '1',
        label: 'John',
      },
      {
        id: '2',
        label: 'Jeff',
      },
    ],
  },
  {
    id: '2',
    title: 'Classmates you have mentioned',
    nodes: [
      {
        id: '3',
        label: 'Tim',
      },
      {
        id: '4',
        label: 'Blake',
      },
    ],
  },
];

const demoNodes = [
  {
    id: '5',
    label: 'Matt',
  },
  {
    id: '6',
    label: 'Taylor',
  },
  {
    id: '7',
    label: 'Maggie',
  },
  {
    id: '8',
    label: 'Emma',
  },
];

function NameGenerator() {
  return (
    <div className={cn(interfaceWrapperClasses, 'flex grow flex-col gap-4')}>
      <Prompts prompts={demoPrompts} currentPromptId={0} />
      <div className="relative flex h-full min-h-0 flex-1 items-start justify-center gap-4">
        <NodePanels panels={demoPanels} />
        <div className="flex-basis-auto flex h-full flex-shrink flex-grow">
          <NodeList items={demoNodes} />
        </div>
      </div>
      <QuickNodeForm />
    </div>
  );
}

export default withOnboardingWizard(NameGenerator, {
  id: 'name-generator',
  name: {
    en: 'Name Generator Help',
  },
  priority: 'Task',
  description: {
    en: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Help with the current task, including how to add new people, how to delete people, and how to edit people.',
          },
        ],
      },
    ],
  },
  steps: [
    {
      title: {
        en: 'Welcome to the Name Generator',
      },
      content: {
        en: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'This is the name generator interface. This interface allows you to nominate people. First, read the prompt and think about the people who meet the criteria.',
              },
            ],
          },
          {
            type: 'image',
            props: {
              src: 'https://documentation.networkcanvas.com/assets/img/interface-documentation/name-generators/ng-quick.png',
              alt: 'Name Generator Interface',
            },
            children: [],
          },
        ],
      },
    },
    {
      targetElementId: 'data-wizard-prompts',
      title: {
        en: 'Prompts',
      },
      content: {
        en: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'These are the prompts. They help you think about the people you want to nominate.',
              },
            ],
          },
        ],
      },
    },
    {
      targetElementId: 'data-wizard-task-step-2',
      title: {
        en: 'Side Panels',
      },
      content: {
        en: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'These are side panels. They show the people you have already mentioned. You can drag and drop a person into the main area to nominate them.',
              },
            ],
          },
        ],
      },
    },
    {
      targetElementId: 'data-wizard-task-step-3',
      title: {
        en: 'Adding a person',
      },
      content: {
        en: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Click this button to add a new person',
              },
            ],
          },
        ],
      },
    },
  ],
});
