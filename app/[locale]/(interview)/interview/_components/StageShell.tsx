'use client';

import PopoverHint from './PopoverHint';
import TooltipHint from '~/components/ui/TooltipHint';
import { useTranslations } from 'next-intl';
import type { Stage } from '@prisma/client';
import { getSteps } from '~/lib/react-joyride/steps';
import Joyride from 'react-joyride';
import Tooltip, { floaterProps } from '~/lib/react-joyride/tooltip';
import Beacon from '~/lib/react-joyride/beacon';

// This is the shell for the interview stage. It contains the main task area and interview task hints/participant instructions.
export default function StageShell({ stage }: { stage: Stage }) {
  const tTooltip = useTranslations('ExampleTooltip');
  const tInformationPopover = useTranslations('InformationPopover');
  const tNameGeneratorPopover = useTranslations('NameGeneratorPopover');

  const popoverContent =
    stage.type === 'NameGenerator'
      ? {
          title: tNameGeneratorPopover('title'),
          hint: tNameGeneratorPopover('hint'),
        }
      : {
          title: tInformationPopover('title'),
          hint: tInformationPopover('hint'),
        };

  return (
    <div className="space-y-4 p-8">
      <Joyride
        steps={stage ? getSteps(stage.type) : []}
        continuous
        tooltipComponent={Tooltip}
        floaterProps={floaterProps}
        beaconComponent={Beacon}
      />
      <h1 id="nameGenerator-1" className="mb-4 text-2xl font-bold">
        Interview Stage {stage.id}
      </h1>
      <h1 className="mb-4 text-2xl font-bold">{stage.type}</h1>
      <PopoverHint title={popoverContent.title} hint={popoverContent.hint} />
      {/* example stage components */}
      <TooltipHint hint={tTooltip('hint')}>
        <div
          id="nameGenerator-2"
          className="flex h-48 w-48 items-center justify-center rounded-full bg-neon-coral-dark text-center text-white"
        >
          Example node
        </div>
      </TooltipHint>
    </div>
  );
}
