import {
  type PropsWithChildren,
  type ReactNode,
  type ComponentType,
} from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '~/lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = ({
  children,
  tooltip,
  side = 'top',
}: PropsWithChildren<{
  tooltip: string | ReactNode;
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
export function withTooltip<T>(WrappedComponent: ComponentType<T>) {
  // Define the props for the HOC
  type WithTooltipProps = T & {
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
    tooltipContent?: ReactNode;
  };

  // Create a new component with forwardRef
  const WithTooltip = ({
    tooltipSide = 'top',
    tooltipContent,
    ...props
  }: WithTooltipProps) => {
    // Extract the title prop for tooltip fallback
    const { title, ...restProps } = props as T & { title?: string };

    return (
      <Tooltip tooltip={tooltipContent ?? title} side={tooltipSide}>
        {/* Pass down all original props, including ref */}
        <WrappedComponent title={title} {...(restProps as T)} />
      </Tooltip>
    );
  };

  // Set the display name for easier debugging
  const wrappedComponentName =
    (WrappedComponent.displayName ?? WrappedComponent.name) || 'Component';
  WithTooltip.displayName = `WithTooltip(${wrappedComponentName})`;

  return WithTooltip;
}

export default Tooltip;
