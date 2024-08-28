import { type HtmlHTMLAttributes } from 'react';
import { cn } from '~/lib/utils';
import { withTooltip } from './Tooltip';

type ProgressBarProps = {
  indeterminate?: boolean;
  orientation?: 'horizontal' | 'vertical';
  value?: number;
  nudge?: boolean;
  className?: string;
} & HtmlHTMLAttributes<HTMLDivElement>;

const fillerValue = (orientation: 'horizontal' | 'vertical', value: number) => {
  const property = orientation === 'horizontal' ? 'width' : 'height';

  return {
    [property]: `${value}%`,
  };
};

const ProgressBar = ({
  indeterminate = false,
  orientation = 'horizontal',
  value = 0,
  nudge = true,
  className,
  ...rest
}: ProgressBarProps) => (
  <div
    {...rest}
    role="progressbar"
    className={cn(
      'relative flex-grow overflow-hidden rounded-full',
      'outline outline-4 outline-offset-8 outline-transparent transition-all duration-300 hover:outline-accent',
      'ring-offset-background focus-visible:transition-none',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      orientation === 'horizontal' ? 'h-3' : 'w-3',
      {
        'bg-muted opacity-20': indeterminate,
        'bg-muted opacity-50': value === 100 && nudge,
      },
      'bg-muted/15',
      className,
    )}
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={value}
  >
    <div
      className={cn(
        'absolute left-0 top-0 rounded-full bg-muted opacity-60',
        orientation === 'horizontal'
          ? 'h-full transition-all duration-300 ease-in-out'
          : 'w-full transition-all duration-300 ease-in-out',
      )}
      style={fillerValue(orientation, value)}
    />
  </div>
);

export const ProgressBarWithTooltip = withTooltip(ProgressBar);

export default ProgressBar;
