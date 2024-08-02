/**
 * Building blocks for NameGenerator interface
 */

import Prompts from '../components/Prompts/Prompts';
import NodePanels from '../containers/NodePanels';
import NodeList from '../components/NodeList';

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
        type: 'person',
      },
      {
        id: '2',
        label: 'Jeff',
        type: 'person',
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
        type: 'person',
      },
      {
        id: '4',
        label: 'Blake',
        type: 'person',
      },
    ],
  },
];

const demoNodes = [
  {
    id: '5',
    label: 'Matt',
    type: 'person',
  },
  {
    id: '6',
    label: 'Taylor',
    type: 'person',
  },
  {
    id: '7',
    label: 'Maggie',
    type: 'person',
  },
  {
    id: '8',
    label: 'Emma',
    type: 'person',
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
    </div>
  );
}
