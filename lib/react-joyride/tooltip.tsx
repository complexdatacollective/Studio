import { XIcon } from 'lucide-react';
import type { TooltipRenderProps } from 'react-joyride';
import { Button } from '~/components/ui/Button';

export default function Tooltip({
  continuous,
  index,
  size,
  step,
  isLastStep,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) {
  return (
    <div
      {...tooltipProps}
      className="max-w-vw rounded-lg bg-accent p-4 text-white"
    >
      <div className="flex w-full items-start justify-between">
        <div>
          <div className="text-lg font-bold">{step.title}</div>
        </div>
        <Button variant="ghost" size="icon" {...closeProps}>
          <XIcon size={16} />
        </Button>
      </div>
      <div>{step.content}</div>
      <div>
        <div className="flex w-full justify-between space-x-4">
          {index !== 0 && <Button {...backProps}>Previous</Button>}
          {!isLastStep && (
            <Button {...primaryProps}>
              {continuous ? 'Next' : 'Close'} ({size - (index + 1)}/{size})
            </Button>
          )}
          {isLastStep && <Button {...closeProps}>🎉 Finish!</Button>}
        </div>
      </div>
    </div>
  );
}

// Todo: figure out a better way to do this...
export const floaterProps = {
  styles: {
    arrow: {
      color: 'hsl(237, 79%, 65%)',
    },
  },
};
