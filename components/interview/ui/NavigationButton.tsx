import { forwardRef } from 'react';
import { withTooltip } from '~/components/ui/Tooltip';
import { cn } from '~/lib/utils';

type NavigationButtonProps = {
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <button
        ref={ref}
        className={cn(
          'm-4 flex h-20 w-20 basis-20 cursor-pointer items-center justify-center rounded-full transition-colors duration-200',
          'hover:bg-success',
          'focus:ring-fox focus:outline-none focus:ring-2',
          className,
        )}
        tabIndex={0}
        onClick={props.onClick}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

NavigationButton.displayName = 'NavigationButton';

export const NavButtonWithTooltip = withTooltip(
  NavigationButton as unknown as React.ComponentType<
    React.HTMLAttributes<HTMLDivElement>
  >,
);
export default NavigationButton;
