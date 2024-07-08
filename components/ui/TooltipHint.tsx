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
  additionalContent,
}: {
  children: ReactNode;
  hint: string;
  additionalContent?: ReactNode;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        {/* asChild replaces the trigger with the child that gets passed to it
        This fixes hydration issues when the trigger is a button
         */}
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          {hint}
          {additionalContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
