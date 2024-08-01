'use client';

import { ChevronUp, ChevronDown, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '~/lib/localisation/navigation';
import { cn } from '~/lib/utils';
import LanguageSwitcher from '~/app/_components/LanguageSwitcher';
import ProgressBar from './ProgressBar';
import type { IntRange } from '~/lib/ts-utils';
import { withTooltip } from '~/components/ui/Tooltip';
import { forwardRef } from 'react';

type NavigationButtonProps = {
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const RawNavigationButton = forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>((props, ref) => {
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
});

RawNavigationButton.displayName = 'RawNavigationButton';

type NavigationProps = {
  pulseNext: boolean;
  progress: IntRange<0, 100>;
};

const NavigationButton = withTooltip(RawNavigationButton);

const Navigation = ({ pulseNext, progress }: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');

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

  const t = useTranslations('Navigation');

  //   // Expanded settings menu
  // <div className="p-4">
  //   <div>Select language </div>
  //   <div className="text-foreground">
  //     <LanguageSwitcher />
  //   </div>
  // </div>

  return (
    <nav
      role="navigation"
      className={cn(
        'flex h-full w-28 flex-shrink-0 flex-grow-0 flex-col items-center bg-cyber-grape text-white',
      )}
    >
      <NavigationButton aria-label={t('menu')} title={t('menu')} side="right">
        <Menu className="h-10 w-10 stroke-[3px]" />
      </NavigationButton>
      <NavigationButton
        onClick={moveBackward}
        aria-label={t('back')}
        title={t('back')}
        side="right"
      >
        <ChevronUp className="h-10 w-10 stroke-[3px]" />
      </NavigationButton>
      <ProgressBar
        value={progress}
        className="bg-white/15"
        ariaLabel="Interview Progress"
      />
      <NavigationButton
        className={cn(
          pulseNext && 'animate-pulse-bg from-cyber-grape to-success',
        )}
        onClick={moveForward}
        aria-label={t('forward')}
        title={t('forward')}
        side="right"
      >
        <ChevronDown className="h-10 w-10 stroke-[3px]" />
      </NavigationButton>
    </nav>
  );
};

export default Navigation;
