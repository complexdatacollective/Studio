import React, { type PropsWithChildren } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '~/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({
  children,
  tooltip,
  side = 'top',
}: PropsWithChildren<{
  tooltip: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}>) => {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          className={cn(
            'data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
            'data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
            'data-[state=delayed-open]:data-[side=left]:animate-tooltipSlideRightAndFade',
            'data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
            'shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]',
            'select-none rounded-sm bg-white px-2 py-2 text-sm text-slate-blue will-change-[transform,opacity]',
          )}
          sideOffset={5} // Distance in PX from the trigger
          collisionPadding={10} // distance from boundary edge
          side={side}
        >
          {tooltip}
          <TooltipPrimitive.Arrow className="fill-white" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

// HOC version of Tooltip that wraps a component with a Tooltip
// and uses the value of the 'title' prop as the tooltip content
export function withTooltip(WrappedComponent) {
  const Component = (props: { side: 'top' | 'right' | 'bottom' | 'left' }) => {
    const { title, side, ...restProps } = props;

    return (
      <Tooltip tooltip={title} side={side}>
        <WrappedComponent {...restProps} />
      </Tooltip>
    );
  };

  Component.displayName = `withTooltip(${WrappedComponent.displayName ?? WrappedComponent.name})`;

  return Component;
}

export default Tooltip;
