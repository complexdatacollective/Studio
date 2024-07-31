import PopoverHint from './PopoverHint';
import TooltipHint from '~/components/ui/TooltipHint';
import { useTranslations } from 'next-intl';
import type { Stage } from '@prisma/client';

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
      <h1 className="mb-4 text-2xl font-bold">Interview Stage {stage.id}</h1>
      <h1 className="mb-4 text-2xl font-bold">{stage.type}</h1>
      <PopoverHint title={popoverContent.title} hint={popoverContent.hint} />
      {/* example stage components */}
      <TooltipHint hint={tTooltip('hint')}>
        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-neon-coral-dark text-center text-white">
          Example node
        </div>
      </TooltipHint>
    </div>
  );
}
