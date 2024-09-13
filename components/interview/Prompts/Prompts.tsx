'use client';

import Prompt from './Prompt';
import Pips from './Pips';
import type { TPrompts } from '~/schemas/protocol/shared/prompt';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('Protocol');

  return (
    <div id={id} className="flex flex-col items-center justify-center">
      <Pips count={prompts.length} currentIndex={currentIndex} />
      <div className="">
        {prompts.map(
          ({ id, text }) =>
            prompts[currentIndex]?.id === id && (
              <Prompt key={id} text={t('Prompt1')} />
            ),
        )}
      </div>
    </div>
  );
}
