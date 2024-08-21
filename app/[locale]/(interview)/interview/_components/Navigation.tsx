'use client';

import { ChevronUp, ChevronDown, Settings2, HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '~/lib/localisation/navigation';
import { cn } from '~/lib/utils';
import ProgressBar from './ProgressBar';
import type { IntRange } from 'type-fest';
import { withTooltip } from '~/components/ui/Tooltip';
import { forwardRef } from 'react';
import Popover from '~/components/ui/Popover';
import Heading from '~/components/typography/Heading';
import LanguageSwitcher from '~/app/[locale]/_components/LanguageSwitcher';
import OnboardWizard from '~/components/OnboardWizard/OnboardWizard';
import { useOnboardWizard } from '~/components/OnboardWizard/OnboardWizardContext';
import ToggleWizardButton from '~/components/OnboardWizard/ToggleWizardButton';
import ResetLocalStorage from '~/components/OnboardWizard/ResetLocalStorage';

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

const NavButtonWithTooltip = withTooltip(NavigationButton);

type NavigationProps = {
  pulseNext: boolean;
  progress: IntRange<0, 100>;
};

const demoSteps = [
  {
    targetElementId: 'data-wizard-navigation-step-1',
    content: {
      en: 'This is the back button. Click it to go to the previous step.',
      es: '',
      ar: '',
    },
  },
  {
    targetElementId: 'data-wizard-navigation-step-2',
    content: {
      en: 'This is the next button. Click it to go to the next step.',
      es: '',
      ar: '',
    },
  },
];

const Navigation = ({ pulseNext, progress }: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');

  const { toggleBeacons, beaconsVisible } = useOnboardWizard();

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

  return (
    <OnboardWizard steps={demoSteps} name="navigation" priority={1}>
      <nav
        role="navigation"
        className={cn(
          'text-white flex h-full w-28 flex-shrink-0 flex-grow-0 flex-col items-center bg-surface-1',
        )}
      >
        <Popover
          content={
            <>
              <Heading variant="label">Select language</Heading>
              <LanguageSwitcher />
            </>
          }
          side="right"
        >
          <span className="rounded-full">
            <NavButtonWithTooltip
              aria-label={t('menu')}
              title={t('menu')}
              tooltipSide="right"
            >
              <Settings2 className="h-10 w-10 stroke-[2px]" />
            </NavButtonWithTooltip>
          </span>
        </Popover>
        <div data-id="data-wizard-navigation-step-1">
          <NavButtonWithTooltip
            onClick={moveBackward}
            aria-label={t('back')}
            title={t('back')}
            tooltipSide="right"
          >
            <ChevronUp className="h-10 w-10 stroke-[3px]" />
          </NavButtonWithTooltip>
        </div>
        <ProgressBar value={progress} ariaLabel="Interview Progress" />
        <div data-id="data-wizard-navigation-step-2">
          <NavButtonWithTooltip
            className={cn(
              pulseNext && 'from-cyber-grape animate-pulse-bg to-success',
            )}
            onClick={moveForward}
            aria-label={t('forward')}
            title={t('forward')}
            tooltipSide="right"
          >
            <ChevronDown className="h-10 w-10 stroke-[3px]" />
          </NavButtonWithTooltip>
        </div>

        <span className="rounded-full">
          <NavButtonWithTooltip
            aria-label={t('help')}
            title={t('help')}
            tooltipSide="right"
            onClick={() => {
              // toggleBeacons();
            }}
          >
            <HelpCircle className="h-10 w-10 stroke-[2px]" />
          </NavButtonWithTooltip>
        </span>
        {/* {beaconsVisible && ( */}
        <div className="absolute bottom-8 left-32 flex space-x-2">
          <ToggleWizardButton
            wizardName="navigation"
            label="Show Interview Help"
          />
          <ToggleWizardButton wizardName="task" label="Show Task Help" />
          <ResetLocalStorage />
        </div>
        {/* )} */}
      </nav>
    </OnboardWizard>
  );
};

export default Navigation;
