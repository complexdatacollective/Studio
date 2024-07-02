'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '~/lib/utils';

const NavigationButton = ({
  onClick,
  className,
  ariaLabel,
  children,
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={cn(
        `session-navigation__button m-4 flex h-[4.8rem] w-[4.8rem] basis-[4.8rem] cursor-pointer items-center justify-center rounded-full transition-all`,
        'hover:bg-primary',
        className,
      )}
      tabIndex={0}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

type NavigationProps = {
  moveBackward: () => void;
  moveForward: () => void;
  pulseNext: boolean;
  progress: number;
};

const Navigation = ({
  moveBackward,
  moveForward,
  pulseNext,
  progress,
}: NavigationProps) => {
  const t = useTranslations('Navigation');
  return (
    <div
      role="navigation"
      className="flex h-full flex-shrink-0 flex-grow-0 flex-col items-center justify-between bg-navy-taupe text-white"
    >
      <NavigationButton onClick={moveBackward} ariaLabel={t('back')}>
        <ChevronUp className="h-[2.4rem] w-[2.4rem]" strokeWidth="3px" />
      </NavigationButton>
      {progress}
      <NavigationButton
        className={cn(
          pulseNext && 'animate-pulse bg-success',
          'hover:bg-success',
        )}
        onClick={moveForward}
        ariaLabel={t('forward')}
      >
        <ChevronDown className="h-[2.4rem] w-[2.4rem]" strokeWidth="3px" />
      </NavigationButton>
    </div>
  );
};

export default Navigation;
