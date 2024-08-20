/**
 * Building blocks for NameGenerator interface
 */

import Prompts from '../components/Prompts/Prompts';
import NodePanels from '../containers/NodePanels';
import NodeList from '../components/NodeList';
import QuickNodeForm from '../containers/QuickNodeForm';

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

export default function NameGenerator() {
  return (
    <div className="flex flex-col overflow-hidden px-4 py-2">
      <Prompts prompts={demoPrompts} currentPromptId={0} />
      <div className="relative flex h-full min-h-0 flex-1 items-start justify-center">
        {/* NameGenerator Main Content */}

        <NodePanels panels={demoPanels} />
        <div className="flex-basis-auto flex h-full flex-shrink flex-grow pl-6">
          <NodeList items={demoNodes} />
        </div>
      </div>
      <QuickNodeForm />
    </div>
  );
}
