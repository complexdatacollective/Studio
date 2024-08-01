'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Prompt from './Prompt';
import { findIndex } from 'lodash';

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
  const currentIndex = findIndex(
    prompts,
    (prompt) => prompt.id === currentPromptId,
  );

  return (
    <motion.div className="flex w-full flex-col items-center justify-center text-balance text-center leading-tight">
      {/* Pips component */}
      <AnimatePresence mode="wait" initial={false}>
        {prompts.map(
          ({ id, text }) =>
            prompts[currentIndex]?.id === id && (
              <Prompt key={id} id={id} text={text} />
            ),
        )}
      </AnimatePresence>
      {/* prompts spacer class? */}
    </motion.div>
  );
}
