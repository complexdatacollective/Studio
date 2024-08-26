/**
 * Building blocks for NameGenerator interface
 */

import Prompts from '~/components/interview/Prompts/Prompts';
import NodePanels from './NodePanels';
import NodeList from '~/components/interview/NodeList';
import QuickNodeForm from './QuickNodeForm';
import OnboardWizard from '~/components/onboard-wizard/OnboardWizard';
import { type Step } from '~/lib/onboarding-wizard/store';

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

const demoSteps: Step[] = [
  {
    content: {
      en: [
        {
          type: 'heading',
          children: [
            {
              text: 'Welcome to the Name Generator',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              text: 'This is the name generator interface. This interface allows you to nominate people. First, read the prompt and think about the people who meet the criteria.',
            },
          ],
        },
        // {
        //   type: 'image',
        //   url: 'https://documentation.networkcanvas.com/assets/img/interface-documentation/name-generators/ng-quick.png',
        //   alt: 'Name Generator Interface',
        // },
      ],
    },
  },
  {
    targetElementId: 'data-wizard-task-step-2',
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
];

export default function NameGenerator() {
  return (
    <OnboardWizard steps={demoSteps} name="task" priority="Task">
      <div className="flex flex-col overflow-hidden px-4 py-2">
        <Prompts
          prompts={demoPrompts}
          currentPromptId={0}
          data-id="data-wizard-task-step-1"
        />

        <div className="relative flex h-full min-h-0 flex-1 items-start justify-center">
          <NodePanels panels={demoPanels} />

          <div className="flex-basis-auto flex h-full flex-shrink flex-grow pl-6">
            <NodeList items={demoNodes} />
          </div>
        </div>
        <QuickNodeForm />
      </div>
    </OnboardWizard>
  );
}
