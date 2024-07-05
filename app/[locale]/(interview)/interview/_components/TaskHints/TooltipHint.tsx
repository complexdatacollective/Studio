import { type ReactNode } from 'react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '~/components/ui/tooltip';

export default function TooltipHint({
  children,
  hint,
}: {
  children: ReactNode;
  hint: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="bg-background text-foreground">
          {hint}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
