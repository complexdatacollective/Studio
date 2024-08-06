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
    targetElementId: 'name-generator-1',
    content: {
      en: (
        <>
          <p>
            This is the name generator interface. This interface allows you to
            nominate people. First, read the prompt and think about the people
            who meet the criteria.
          </p>
          <img
            src="https://documentation.networkcanvas.com/assets/img/interface-documentation/name-generators/ng-quick.png"
            alt="Name Generator Interface"
            style={{ width: '100%', height: 'auto', marginTop: '10px' }}
          />
        </>
      ),
      es: '',
      ar: '',
    },
  },
  {
    targetElementId: 'name-generator-2',
    content: {
      en: 'These are side panels. They show the people you have already mentioned. You can drag and drop a person into the main area to nominate them.',
      es: '',
      ar: '',
    },
  },
  {
    targetElementId: 'name-generator-3',
    content: {
      en: 'Click this button to add a new person.',
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
        <div data-id="name-generator-1">
          <Prompts prompts={demoPrompts} currentPromptId={0} />
        </div>

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
