import { forwardRef } from 'react';
import { Button, type ButtonProps } from '~/components/ui/Button';
import { withTooltip } from '~/components/ui/Tooltip';
import { cn } from '~/lib/utils';

type NavigationButtonProps = {
  className?: string;
  color?: ButtonProps['color'];
} & React.HTMLAttributes<HTMLButtonElement>;

const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  (props, ref) => {
    const { className, children, color, ...rest } = props;
    console.log('className', className);
    return (
      <Button
        variant="text"
        size="icon"
        color={color}
        ref={ref}
        className={cn('h-20 w-20', className)}
        onClick={props.onClick}
        {...rest}
      >
        {children}
      </Button>
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
