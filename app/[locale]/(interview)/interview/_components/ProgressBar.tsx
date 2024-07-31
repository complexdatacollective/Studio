import React from 'react';
import cx from 'classnames';

type ProgressBarProps = {
  indeterminate?: boolean;
  onClick?: () => void;
  orientation?: 'horizontal' | 'vertical';
  percentProgress?: number;
  nudge?: boolean;
};

const fillerValue = (
  orientation: 'horizontal' | 'vertical',
  percentProgress: number,
) => {
  const property = orientation === 'horizontal' ? 'width' : 'height';

  return {
    [property]: `${percentProgress}%`,
  };
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  indeterminate = false,
  onClick,
  orientation = 'vertical',
  percentProgress = 0,
  nudge = true,
}) => (
  <div
    className={cx(
      'relative flex-grow overflow-hidden rounded-full',
      orientation === 'horizontal' ? 'h-3' : 'w-3',
      {
        'bg-muted opacity-20': indeterminate,
        'bg-muted opacity-50': percentProgress === 100 && nudge,
      },
    )}
    onClick={onClick}
  >
    <div
      className={cx(
        'absolute left-0 top-0 rounded-full bg-muted opacity-50',
        orientation === 'horizontal'
          ? 'h-full transition-all duration-300 ease-in-out'
          : 'w-full transition-all duration-300 ease-in-out',
      )}
      style={fillerValue(orientation, percentProgress)}
    />
  </div>
);

export default ProgressBar;
