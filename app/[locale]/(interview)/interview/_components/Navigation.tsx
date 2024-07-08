'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '~/lib/localisation/navigation';

import { cn } from '~/lib/utils';
import LanguageSwitcher from '~/app/_components/LanguageSwitcher';

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
        `m-4 flex h-[4.8rem] w-[4.8rem] basis-[4.8rem] cursor-pointer items-center justify-center rounded-full transition-all`,
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
  pulseNext: boolean;
  progress: number;
};

const Navigation = ({ pulseNext, progress }: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');
  const [expanded, setExpanded] = useState(false);

  const moveBackward = () => {
    if (!stage) return;
    const newStage = parseInt(stage) - 1;
    router.push(`${pathname}/?stage=${newStage}`);
  };

  const moveForward = () => {
    if (!stage) return;
    const newStage = parseInt(stage) + 1;
    router.push(`${pathname}/?stage=${newStage}`);
  };

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  const t = useTranslations('Navigation');

  return (
    <div
      role="navigation"
      className={cn(
        'flex h-full flex-shrink-0 flex-grow-0 flex-col items-center justify-between bg-cyber-grape text-white',
        expanded && 'w-full',
      )}
    >
      <NavigationButton onClick={toggleMenu} ariaLabel="Menu">
        {expanded ? (
          <X className="h-[2.4rem] w-[2.4rem]" strokeWidth="3px" />
        ) : (
          <Menu className="h-[2.4rem] w-[2.4rem]" strokeWidth="3px" />
        )}
      </NavigationButton>
      {!expanded && (
        <>
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
        </>
      )}
      {expanded && (
        <div className="p-4">
          <div>Select language </div>
          <LanguageSwitcher />
        </div>
      )}
    </div>
  );
};

export default Navigation;
