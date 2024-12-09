import { type PropsWithChildren, type ReactNode } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '~/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({
  children,
  tooltip,
  side,
}: PropsWithChildren<{
  tooltip: string | ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}>) => {
  // defer getting portal container until the component mounts
  const portalContainer =
    typeof window !== 'undefined'
      ? document.getElementById('dialog-portal')
      : null;
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal container={portalContainer}>
        <TooltipPrimitive.Content
          className={cn(
            'motion-safe:data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
            'motion-safe:data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
            'motion-safe:data-[state=delayed-open]:data-[side=left]:animate-tooltipSlideRightAndFade',
            'motion-safe:data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
            'shadow-md',
            'select-none rounded-small bg-surface-0 px-2 py-2 text-sm text-surface-0-foreground will-change-[transform,opacity]',
          )}
          sideOffset={5} // Distance in PX from the trigger
          side={side}
        >
          {tooltip}

          <TooltipPrimitive.Arrow className="fill-surface-0" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

// HOC version of Tooltip that wraps a component with a Tooltip
export function withTooltip<P>(WrappedComponent: React.ComponentType<P>) {
  // Define the props for the HOC
  type WithTooltipProps = P & {
    tooltipContent: ReactNode;
  };

  // Create a new component with forwardRef
  const WithTooltip = ({ tooltipContent, ...props }: WithTooltipProps) => {
    return (
      <Tooltip tooltip={tooltipContent}>
        <WrappedComponent
          {...(props as P)} // Type casting props to match WrappedComponent's props
          tabIndex={0}
        />
      </Tooltip>
    );
  };

  return WithTooltip;
}
export default Tooltip;
