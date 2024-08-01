'use client';

import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Popover from '~/components/ui/Popover';
import Tooltip from '~/components/ui/Tooltip';

export default function PopoverHint({
  hint,
  title,
}: {
  hint: string;
  title?: string;
}) {
  const t = useTranslations('PopoverHint');

  return (
    <Popover content={hint}>
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
            className="z-10 flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-accent p-2 text-accent-foreground sm:h-20 sm:w-20 sm:p-6"
            aria-label={t('open')}
          >
            <Info className="h-6 w-6 sm:h-8 sm:w-8" />
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
