import React from 'react';
import cx from 'classnames';

type ProgressBarProps = {
  indeterminate?: boolean;
  onClick?: () => void;
  orientation?: 'horizontal' | 'vertical';
  value?: number;
  nudge?: boolean;
  className?: string;
  ariaLabel: string;
};

const fillerValue = (orientation: 'horizontal' | 'vertical', value: number) => {
  const property = orientation === 'horizontal' ? 'width' : 'height';

  return {
    [property]: `${value}%`,
  };
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  indeterminate = false,
  onClick,
  orientation = 'vertical',
  value = 0,
  nudge = true,
  ariaLabel,
  className,
}) => (
  <div
    className={cx(
      'relative flex-grow overflow-hidden rounded-full',
      orientation === 'horizontal' ? 'h-3' : 'w-3',
      {
        'bg-muted opacity-20': indeterminate,
        'bg-muted opacity-50': value === 100 && nudge,
      },
      'bg-muted/15',
      className,
    )}
    onClick={onClick}
    role="progressbar"
    aria-valuemax={100}
    aria-valuemin={0}
    aria-valuenow={value}
    aria-label={ariaLabel}
  >
    <div
      className={cx(
        'absolute left-0 top-0 rounded-full bg-muted opacity-60',
        orientation === 'horizontal'
          ? 'h-full transition-all duration-300 ease-in-out'
          : 'w-full transition-all duration-300 ease-in-out',
      )}
      style={fillerValue(orientation, value)}
    />
  </div>
);

export default ProgressBar;
