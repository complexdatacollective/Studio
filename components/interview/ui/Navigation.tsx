'use client';

import { ChevronUp, ChevronDown, Settings2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '~/lib/localisation/navigation';
import { cn } from '~/lib/utils';
import ProgressBar from '../../ui/ProgressBar';
import type { IntRange } from 'type-fest';
import Popover from '~/components/ui/Popover';
import Heading from '~/components/typography/Heading';
import LanguageSwitcher from '~/app/[locale]/_components/LanguageSwitcher';
import OnboardWizard from '~/components/onboard-wizard/OnboardWizard';
import HelpButton from './HelpButton';
import { NavButtonWithTooltip } from './NavigationButton';

type NavigationProps = {
  pulseNext: boolean;
  progress: IntRange<0, 100>;
};

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

  return (
    <OnboardWizard
      steps={[
        {
          targetElementId: 'nav-wizard-settings',
          content: {
            en: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'This is the settings button. Click it to open the settings menu.',
                  },
                ],
              },
            ],
          },
        },
        {
          targetElementId: 'nav-wizard-help',
          content: {
            en: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'This is the help button. Click it to open the help menu.',
                  },
                ],
              },
            ],
          },
        },
        {
          targetElementId: 'nav-wizard-back',
          content: {
            en: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'This is the back button. Click it to go to the previous step.',
                  },
                ],
              },
            ],
          },
        },
        {
          targetElementId: 'nav-wizard-forward',
          content: {
            en: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'This is the forward button. Click it to go to the next step.',
                  },
                ],
              },
            ],
          },
        },
      ]}
      name="navigation"
      priority="Navigation"
    >
      <nav
        role="navigation"
        className={cn(
          'flex h-full w-28 flex-shrink-0 flex-grow-0 flex-col items-center bg-surface-1 text-foreground',
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
          <NavButtonWithTooltip
            aria-label={t('menu')}
            title={t('menu')}
            tooltipSide="right"
            id="nav-wizard-settings"
          >
            <Settings2 className="h-10 w-10 stroke-[2px]" />
          </NavButtonWithTooltip>
        </Popover>
        <HelpButton id="nav-wizard-help" />
        <NavButtonWithTooltip
          id="nav-wizard-back"
          onClick={moveBackward}
          aria-label={t('back')}
          title={t('back')}
          tooltipSide="right"
        >
          <ChevronUp className="h-10 w-10 stroke-[3px]" />
        </NavButtonWithTooltip>
        <ProgressBar value={progress} ariaLabel="Interview Progress" />
        <NavButtonWithTooltip
          id="nav-wizard-forward"
          className={cn(
            pulseNext &&
              'from-cyber-grape to-success motion-safe:animate-pulse-bg motion-reduce:bg-success',
          )}
          onClick={moveForward}
          aria-label={t('forward')}
          title={t('forward')}
          tooltipSide="right"
        >
          <ChevronDown className="h-10 w-10 stroke-[3px]" />
        </NavButtonWithTooltip>
      </nav>
    </OnboardWizard>
  );
};

export default Navigation;
