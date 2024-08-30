'use client';

import { CircleHelp } from 'lucide-react';
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
  return (
    <Popover content={popoverContent}>
      <span>
        <Tooltip
          tooltip={<div className="flex">{tooltipKeyboardShortcut()}</div>}
        >
          <button className="z-10 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-accent p-2 text-accent-foreground sm:h-20 sm:w-20 sm:p-6">
            <CircleHelp />
          </button>
        </Tooltip>
      </span>
    </Popover>
  );
}

const tooltipKeyboardShortcut = () => {
  return (
    <kbd className="text-xs font-medium pointer-events-none ml-4 inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-muted-foreground opacity-100">
      <span className="text-sm">⌘</span>I
    </kbd>
  );
};
