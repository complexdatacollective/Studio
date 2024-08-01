import { motion } from 'framer-motion';
import { cn } from 'lib/utils';

const container = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delay: 0.15,
      when: 'beforeChildren',
    },
  },
};

const item = {
  initial: { opacity: 0, y: '-200%' },
  animate: { opacity: 1, y: 0 },
};

/**
 * Renders a set of pips indicating the current `Prompt`.
 * todo: add `large` prop
 */

export default function Pips({
  count,
  currentIndex,
}: {
  count: number;
  currentIndex: number;
}) {
  return (
    <motion.div
      className="flex w-full items-center justify-center space-x-2"
      variants={container}
    >
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            'h-4 w-4 rounded-full border-2 border-white border-opacity-15 transition-colors ease-in',
            index === currentIndex
              ? 'bg-white bg-opacity-15'
              : 'bg-transparent',
          )}
          variants={item}
        />
      ))}
    </motion.div>
  );
}
