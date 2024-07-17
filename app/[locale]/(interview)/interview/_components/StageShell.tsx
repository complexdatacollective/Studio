import PopoverHint from './PopoverHint';
import TooltipHint from '~/components/ui/TooltipHint';
import { useTranslations } from 'next-intl';
import { getStage } from '~/server/queries/stages';

// This is the shell for the interview stage. It contains the main task area and interview task hints/participant instructions.
export default function StageShell({
  stageId,
  protocolRevisionId,
}: {
  stageId: number;
  protocolRevisionId: number;
}) {
  const tTooltip = useTranslations('ExampleTooltip');
  const tPopover = useTranslations('ExamplePopover');
  const stage = getStage({ stageId, protocolRevisionId });
  return (
    <div className="space-y-4 p-8">
      <h1 className="mb-4 text-2xl font-bold">Interview Stage {stageId}</h1>
      <p>This is the main task area</p>
      <PopoverHint title={tPopover('title')} hint={tPopover('hint')} />
      {/* example stage components */}
      <TooltipHint hint={tTooltip('hint')}>
        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-neon-coral-dark text-center text-white">
          Example node
        </div>
      </TooltipHint>
      {JSON.stringify(stage)}
    </div>
  );
}
