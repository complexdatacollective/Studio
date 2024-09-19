import { Button, type ButtonProps } from '~/components/ui/Button';
import { withTooltip } from '~/components/ui/Tooltip';
import { cn } from '~/lib/utils';

const NavigationButton = (props: ButtonProps) => {
  const { className, children, color, ...rest } = props;
  return (
    <Button
      variant="text"
      size="icon"
      color={color}
      className={cn('h-20 w-20', className)}
      onClick={props.onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

NavigationButton.displayName = 'NavigationButton';

export const NavButtonWithTooltip = withTooltip(NavigationButton);
