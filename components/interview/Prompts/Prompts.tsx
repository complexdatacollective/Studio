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
    <div
      id={id}
      className="flex w-full flex-col items-center justify-center text-balance pb-5 text-center leading-tight"
    >
      <Pips count={prompts.length} currentIndex={currentIndex} />

      {prompts.map(
        ({ id, text }) =>
          prompts[currentIndex]?.id === id && (
            <Prompt key={id} id={id} text={text} />
          ),
      )}
    </div>
  );
}
