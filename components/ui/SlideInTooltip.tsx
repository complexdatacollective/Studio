'use client';

import { useState, useRef } from 'react';
import { Info, X } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';

export default function SlideInTooltip({ hint }: { hint: string }) {
  const [showHint, setShowHint] = useState(false);
  const hintRef = useRef<HTMLDivElement>(null);

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const closeHint = () => {
    setShowHint(false);
  };

  const variants: Variants = {
    visible: {
      opacity: 1,
      x: 0,
    },
    hidden: {
      opacity: 0,
      x: '100%',
    },
  };

  return (
    <div>
      <button
        onClick={toggleHint}
        className="focusable fixed right-6 top-6 z-10 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-accent p-6 text-accent-foreground sm:h-20 sm:w-20"
      >
        <Info className="h-8 w-8" />
      </button>
      {showHint && (
        <motion.div
          ref={hintRef}
          className="fixed right-0 top-0 z-50 p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="relative flex h-12 justify-between rounded-lg bg-accent p-4 text-accent-foreground sm:h-20">
            <div className="flex items-center">
              <p>{hint}</p>
            </div>
            <button
              onClick={closeHint}
              className="p-2 opacity-70 transition-opacity hover:opacity-100"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
