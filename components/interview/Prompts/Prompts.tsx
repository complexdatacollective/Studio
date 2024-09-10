'use client';

import Prompt from './Prompt';
import Pips from './Pips';
import { useInterviewLocale } from '~/lib/localisation/interview/Provider';
import type { TPrompts } from '~/schemas/protocol/shared/prompt';

export default function Prompts({
  prompts,
  currentPromptId,
  id,
}: {
  id?: string;
  prompts: TPrompts;
  currentPromptId: string;
}) {
  const currentIndex = prompts.findIndex(({ id }) => id === currentPromptId);
  const { locale } = useInterviewLocale();

  return (
    <div id={id} className="flex flex-col items-center justify-center">
      <Pips count={prompts.length} currentIndex={currentIndex} />
      <div className="">
        {prompts.map(
          ({ id, text }) =>
            prompts[currentIndex]?.id === id && (
              <Prompt key={id} text={text[locale] ?? text.DEFAULT} />
            ),
        )}
      </div>
    </div>
  );
}
