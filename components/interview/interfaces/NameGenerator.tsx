/**
 * Building blocks for NameGenerator interface
 */

import Prompts from '../components/Prompts/Prompts';

const demoPrompts = [
  {
    id: 0,
    text: '**Within the past 6 months**, who have you felt _close to_, or discussed important personal matters with?',
  },
  {
    id: 1,
    text: '**Who do you feel** _most comfortable_ with?',
  },
];

export default function NameGenerator() {
  return (
    <div className="flex overflow-hidden px-4 py-2">
      <Prompts prompts={demoPrompts} currentPromptId={0} />
    </div>
  );
}
