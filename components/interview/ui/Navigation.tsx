'use client';

import { ChevronUp, ChevronDown, Settings2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '~/lib/localisation/navigation';
import { cn } from '~/lib/utils';
import { ProgressBarWithTooltip } from '../../ui/ProgressBar';
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

  const t = useTranslations('Interview.Navigation');

  return (
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
                      text: 'You can change the language from the settings button, or access help options by clicking the help button.',
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
    >
      <nav
        id="navigation-bar"
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
          <NavButtonWithTooltip title={t('Menu')} tooltipSide="right">
            <Settings2 className="h-10 w-10 stroke-[2px]" />
          </NavButtonWithTooltip>
        </Popover>
        <HelpButton id="nav-wizard-help" />
        <div
          id="interview-movement"
          className="flex flex-1 flex-col items-center"
        >
          <NavButtonWithTooltip
            onClick={moveBackward}
            title={t('Back')}
            tooltipSide="right"
          >
            <ChevronUp className="h-10 w-10 stroke-[3px]" />
          </NavButtonWithTooltip>
          <ProgressBarWithTooltip
            value={progress}
            orientation="vertical"
            title={t('Progress', { percent: progress })}
          />
          <NavButtonWithTooltip
            className={cn(
              pulseNext &&
                'from-cyber-grape to-success motion-safe:animate-pulse-bg motion-reduce:bg-success',
            )}
            onClick={moveForward}
            title={t('Forward')}
            tooltipSide="right"
          >
            <ChevronDown className="h-10 w-10 stroke-[3px]" />
          </NavButtonWithTooltip>
        </div>
      </nav>
    </OnboardWizard>
  );
};

export default Navigation;
