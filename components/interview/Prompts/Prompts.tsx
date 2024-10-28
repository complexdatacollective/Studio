'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import type { Prompt as PromptType } from '~/schemas/protocol/prompt';
import Pips from './Pips';
import Prompt from './Prompt';

export default function Prompts({
  prompts,
  ...props
}: {
  prompts: PromptType[];
} & React.HTMLProps<HTMLDivElement>) {
  const [currentPromptIndex] = useState(0);
  const t = useTranslations(`Protocol.Prompts`);

  const { id } = prompts[currentPromptIndex]!;

  return (
    <div {...props} className="flex flex-col items-center justify-center">
      <Pips count={prompts.length} currentIndex={currentPromptIndex} />
      <Prompt text={t(`${id}`)} />
    </div>
  );
}
