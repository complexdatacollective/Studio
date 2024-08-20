'use client';

import { CircleHelp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';
import Popover from '~/components/ui/Popover';
import Tooltip from '~/components/ui/Tooltip';

/**
 * Component for Interview screen to show stage level instructions.
 */
export default function PopoverHint({
  popoverContent,
}: {
  popoverContent: ReactNode;
}) {
  const t = useTranslations('PopoverHint');

  return (
    <Popover content={popoverContent}>
      <span>
        <Tooltip
          tooltip={
            <div className="flex">
              {t('hint')}
              {tooltipKeyboardShortcut()}
            </div>
          }
        >
          <button
            className="z-10 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-accent p-2 text-accent-foreground sm:h-20 sm:w-20 sm:p-6"
            aria-label={t('open')}
          >
            <CircleHelp />
          </button>
        </Tooltip>
      </span>
    </Popover>
  );
}

const tooltipKeyboardShortcut = () => {
  return (
    <kbd className="pointer-events-none ml-4 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
      <span className="text-sm">⌘</span>I
    </kbd>
  );
};
