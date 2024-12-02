'use client';

import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '~/lib/utils';
import { ProgressBarWithTooltip } from '../../ui/ProgressBar';
import type { IntRange } from 'type-fest';
import HelpButton from './HelpButton';
import { NavButtonWithTooltip } from './NavigationButton';
import Surface from '~/components/layout/Surface';
import { type Locale } from '~/lib/localisation/config';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import InterviewLocaleSwitcher from './InterviewLocaleSwitcher';
import { withOnboardingWizard } from '~/components/onboard-wizard/withOnboardingWizard';

type NavigationProps = {
  pulseNext: boolean;
  progress: IntRange<0, 100>;
  availableLocales: Locale[];
};

const Navigation = ({
  pulseNext,
  progress,
  availableLocales,
}: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');
  const t = useTranslations('Interview.Navigation');
  const isMediumScreen = useMediaQuery('md');

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

  return (
    <Surface
      as="nav"
      level={1}
      spacing="none"
      id="navigation-bar"
      role="navigation"
      className={cn(
        'flex items-center gap-2 px-2',
        'md:h-full md:w-28 md:flex-shrink-0 md:flex-grow-0 md:flex-col md:px-0 md:py-2',
      )}
    >
      <InterviewLocaleSwitcher codes={availableLocales} />
      <HelpButton id="nav-wizard-help" />
      <div
        id="interview-movement"
        className={cn('flex flex-1 flex-row items-center gap-2', 'md:flex-col')}
      >
        <NavButtonWithTooltip
          onClick={moveBackward}
          tooltipContent={t('Previous')}
        >
          {isMediumScreen ? (
            <ChevronUp className="h-10 w-10 stroke-[3px]" />
          ) : (
            <ChevronLeft className="h-10 w-10 stroke-[3px] rtl:rotate-180" />
          )}
        </NavButtonWithTooltip>
        <ProgressBarWithTooltip
          label={t('Progress', { percent: progress })}
          value={progress}
          orientation={isMediumScreen ? 'vertical' : 'horizontal'}
          tooltipContent={t('Progress', { percent: progress })}
        />
        <NavButtonWithTooltip
          className={cn(pulseNext && 'animate-nudge bg-success')}
          onClick={moveForward}
          tooltipContent={t('Next')}
        >
          {isMediumScreen ? (
            <ChevronDown className="h-10 w-10 stroke-[3px]" />
          ) : (
            <ChevronRight className="h-10 w-10 stroke-[3px] rtl:rotate-180" />
          )}
        </NavButtonWithTooltip>
      </div>
    </Surface>
  );
};

export default withOnboardingWizard(Navigation, () => {
  const t = useTranslations('Interview.Wizards.General');

  return {
    id: 'general-interview-information',
    name: t('Name'),
    priority: 'Navigation',
    description: [
      {
        type: 'paragraph',
        children: [
          {
            text: t('Description'),
          },
        ],
      },
    ],
    steps: [
      {
        title: t('Steps.Welcome.Title'),
        content: [
          {
            type: 'paragraph',
            children: [
              {
                text: t('Steps.Welcome.Text'),
              },
            ],
          },
        ],
      },
      {
        targetElementId: 'navigation-bar',
        title: t('Steps.NavigationBar.Title'),
        content: [
          {
            type: 'paragraph',
            children: [
              {
                text: t('Steps.NavigationBar.Text'),
              },
            ],
          },
          {
            type: 'paragraph',
            children: [
              {
                text: 'You can change the language by clicking the globe icon, or access help options by clicking the help button.',
              },
            ],
          },
        ],
      },
      {
        targetElementId: 'interview-movement',
        title: t('Steps.InterviewMovement.Title'),
        content: [
          {
            type: 'paragraph',
            children: [
              {
                text: t('Steps.InterviewMovement.Text'),
              },
            ],
          },
        ],
      },
    ],
  };
});
