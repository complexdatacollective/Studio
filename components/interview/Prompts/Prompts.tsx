'use client';

import Prompt from './Prompt';
import Pips from './Pips';

type Prompt = {
  id: number;
  text: string;
};

export default function Prompts({
  prompts,
  currentPromptId,
  id,
}: {
  id?: string;
  prompts: Prompt[];
  currentPromptId: number;
}) {
  const currentIndex = prompts.findIndex(({ id }) => id === currentPromptId);

  return (
    <div id={id} className="flex flex-col items-center justify-center">
      <Pips count={prompts.length} currentIndex={currentIndex} />
      <div className="">
        {prompts.map(
          ({ id, text }) =>
            prompts[currentIndex]?.id === id && <Prompt key={id} text={text} />,
        )}
      </div>
    </div>
  );
}
