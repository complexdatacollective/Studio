import { type HtmlHTMLAttributes } from 'react';
import { cn } from '~/lib/utils';
import { withTooltip } from './Tooltip';

type ProgressBarProps = {
  indeterminate?: boolean;
  orientation?: 'horizontal' | 'vertical';
  value?: number;
  nudge?: boolean;
  className?: string;
  label: string;
} & HtmlHTMLAttributes<HTMLDivElement>;

const fillerValue = (orientation: 'horizontal' | 'vertical', value: number) => {
  const property = orientation === 'horizontal' ? 'width' : 'height';

  return {
    [property]: `${value}%`,
  };
};

const ProgressBar = ({
  label,
  indeterminate = false,
  orientation = 'horizontal',
  value = 0,
  nudge = false,
  className,
  ...rest
}: ProgressBarProps) => (
  <div
    {...rest}
    role="progressbar"
    className={cn(
      'relative flex-grow overflow-hidden rounded-full',
      'ring-offset-background focus-visible:transition-none',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      orientation === 'horizontal' ? 'h-3 w-full' : 'h-full w-3',
      'bg-[color-mix(in_hsl,currentColor_20%,transparent)]',
      nudge && 'animate-nudge bg-success',
      className,
    )}
    aria-label={label}
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={value}
  >
    <div
      className={cn(
        'absolute left-0 top-0 rounded-full bg-[currentColor]',
        nudge && 'hidden',
        indeterminate && 'animate-indeterminate-progress-bar',
        orientation === 'horizontal'
          ? 'h-full transition-all duration-300 ease-in-out'
          : 'w-full transition-all duration-300 ease-in-out',
        value === 100 && 'bg-success',
      )}
      style={fillerValue(orientation, value)}
    />
  </div>
);

export const ProgressBarWithTooltip = withTooltip(ProgressBar);

export default ProgressBar;
