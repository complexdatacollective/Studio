'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Prompt from './Prompt';
import Pips from './Pips';

type Prompt = {
  id: number;
  text: string;
};

export default function Prompts({
  prompts,
  currentPromptId,
}: {
  prompts: Prompt[];
  currentPromptId: number;
}) {
  const currentIndex = prompts.findIndex(({ id }) => id === currentPromptId);

  return (
    <motion.div className="flex w-full flex-col items-center justify-center text-balance pb-2 text-center leading-tight">
      <Pips count={prompts.length} currentIndex={currentIndex} />
      <AnimatePresence mode="wait" initial={false}>
        {prompts.map(
          ({ id, text }) =>
            prompts[currentIndex]?.id === id && (
              <Prompt key={id} id={id} text={text} />
            ),
        )}
      </AnimatePresence>
    </motion.div>
  );
}
