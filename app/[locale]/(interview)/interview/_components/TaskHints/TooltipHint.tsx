// abstract away the complexities of using the Tooltip component
// this should be a function that can wrap any Interview component
// takes children and a hint prop
// hint prop will be the text content of the tooltip
// children will be the component that should trigger the tooltip

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
        <TooltipContent>{hint}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
