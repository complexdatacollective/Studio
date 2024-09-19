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
import OnboardWizard from '~/components/onboard-wizard/OnboardWizard';
import HelpButton from './HelpButton';
import { NavButtonWithTooltip } from './NavigationButton';
import Surface from '~/components/layout/Surface';
import { type Locale } from '~/lib/localisation/config';
import { useMediaQuery } from '~/hooks/useMediaQuery';
import InterviewLocaleSwitcher from './InterviewLocaleSwitcher';

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
    <>
      <OnboardWizard
        wizard={{
          id: 'general-interview-information',
          name: {
            en: 'General Interview Information',
          },
          priority: 'Navigation',
          description: {
            en: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: 'Help with the general interview process, including how to navigate the interview, and general tips to help you get started.',
                  },
                ],
              },
            ],
          },
          steps: [
            {
              title: {
                en: 'Welcome to the Interview!',
              },
              content: {
                en: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Before you begin, here are some general tips to help you navigate the interview process.',
                      },
                    ],
                  },
                ],
              },
            },
            {
              targetElementId: 'navigation-bar',
              title: {
                en: 'Navigation Bar',
              },
              content: {
                en: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'The navigation bar helps you move through the interview process, and get help if you need it.',
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
            },
            {
              targetElementId: 'interview-movement',
              title: {
                en: 'Navigating the Interview',
              },
              content: {
                en: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Use the back and forward buttons to move through the interview, and track your progress using the progress bar.',
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }}
      />
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
          className={cn(
            'flex flex-1 flex-row items-center gap-2',
            'md:flex-col',
          )}
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
    </>
  );
};

export default Navigation;
