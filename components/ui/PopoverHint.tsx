'use client';

import { useRef, useEffect } from 'react';
import { Info, X } from 'lucide-react';
import { motion, type Variants, useCycle } from 'framer-motion';
import TooltipHint from './TooltipHint';
import { useTranslations } from 'next-intl';

export default function PopoverHint({
  hint,
  title,
}: {
  hint: string;
  title?: string;
}) {
  const [showHint, toggleShowHint] = useCycle(false, true);
  const hintRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('PopoverHint');

  // Keyboard shortcut to toggle hint
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'i' && event.metaKey) {
        // CMD + I
        toggleShowHint();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [toggleShowHint]);

  const variants: Variants = {
    open: {
      clipPath: `circle(150% at 90% 0)`,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        restDelta: 2,
      },
    },
    closed: {
      clipPath: 'circle(30px at 90% 0)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <div>
      <TooltipHint
        hint={
          <div className="flex">
            {t('hint')}
            {tooltipKeyboardShortcut()}
          </div>
        }
      >
        <button
          onClick={() => toggleShowHint()}
          className="focusable fixed right-6 top-6 z-10 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-accent p-2 text-accent-foreground transition-transform hover:scale-105 sm:h-20 sm:w-20 sm:p-6"
          aria-label={t('open')}
        >
          <Info className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </TooltipHint>
      <motion.div
        ref={hintRef}
        className="fixed right-0 top-0 z-50 p-6"
        initial={false}
        animate={showHint ? 'open' : 'closed'}
        variants={variants}
      >
        <div className="relative flex min-h-12 max-w-md justify-between rounded-lg bg-accent p-4 text-accent-foreground sm:min-h-20">
          <div className="flex flex-col">
            <h2 className="font-bold">{title}</h2>
            <p>{hint}</p>
          </div>
          <button
            onClick={() => toggleShowHint()}
            className="p-2 opacity-70 transition-opacity hover:opacity-100"
            aria-label={t('close')}
          >
            <X className="h-8 w-8" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const tooltipKeyboardShortcut = () => {
  return (
    <kbd className="pointer-events-none ml-4 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
      <span className="text-sm">⌘</span>I
    </kbd>
  );
};
