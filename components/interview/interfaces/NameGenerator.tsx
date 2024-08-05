/**
 * Building blocks for NameGenerator interface
 */

import Prompts from '../components/Prompts/Prompts';
import NodePanels from '../containers/NodePanels';
import NodeList from '../components/NodeList';
import QuickNodeForm from '../containers/QuickNodeForm';
import OnboardWizard from '../OnboardWizard/OnboardWizard';
import ToggleWizardButton from '../OnboardWizard/ToggleWizardButton';

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

const demoSteps = [
  {
    id: 0,
    targetElementId: 'name-generator-1',
    content: {
      en: 'Welcome to the Name Generator! We will help you generate a name for your interview.',
      es: '',
      ar: '',
    },
  },
  {
    id: 1,
    targetElementId: 'name-generator-2',
    content: {
      en: 'First, we will ask you a few questions to help us generate a name for your interview.',
      es: '',
      ar: '',
    },
  },
];

export default function NameGenerator() {
  return (
    <OnboardWizard steps={demoSteps}>
      <ToggleWizardButton />
      <div className="flex flex-col overflow-hidden px-4 py-2">
        <div id="name-generator-2">
          <Prompts prompts={demoPrompts} currentPromptId={0} />
        </div>
        <div className="h-12 w-12 bg-tomato" id="name-generator-1">
          test
        </div>
        <div className="relative flex h-full min-h-0 flex-1 items-start justify-center">
          {/* NameGenerator Main Content */}

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
