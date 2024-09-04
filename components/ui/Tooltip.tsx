import type {
  PropsWithChildren,
  ReactNode,
  ComponentType,
  HtmlHTMLAttributes,
} from 'react';
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
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal
        container={document.getElementById('dialog-portal')}
      >
        <TooltipPrimitive.Content
          className={cn(
            'motion-safe:data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade',
            'motion-safe:data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade',
            'motion-safe:data-[state=delayed-open]:data-[side=left]:animate-tooltipSlideRightAndFade',
            'motion-safe:data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade',
            'shadow-md',
            'bg-surface-0 text-surface-0-foreground select-none rounded-small px-2 py-2 text-sm will-change-[transform,opacity]',
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
export function withTooltip<T extends HtmlHTMLAttributes<HTMLDivElement>>(
  WrappedComponent: ComponentType<T>,
) {
  // Define the props for the HOC
  type WithTooltipProps = T & {
    title?: string;
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left';
    tooltipContent?: ReactNode;
  };

  // Create a new component with forwardRef
  const WithTooltip = ({
    title,
    tooltipSide = 'top',
    tooltipContent,
    ...props
  }: WithTooltipProps) => {
    return (
      <Tooltip tooltip={tooltipContent ?? title} side={tooltipSide}>
        {/* Pass down all original props, including ref */}
        <WrappedComponent
          aria-label={tooltipContent ?? title}
          {...(props as T)}
          tabIndex={0}
        />
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
