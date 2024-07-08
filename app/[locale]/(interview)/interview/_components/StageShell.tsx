import PopoverHint from '~/components/ui/PopoverHint';
import TooltipHint from '~/components/ui/TooltipHint';
import { useTranslations } from 'next-intl';

// This is the shell for the interview stage. It contains the main task area and interview task hints/participant instructions.
export default function StageShell({ stageId }: { stageId: number }) {
  const tTooltip = useTranslations('ExampleTooltip');
  const tPopover = useTranslations('ExamplePopover');
  return (
    <div className="space-y-4 p-8">
      <h1 className="mb-4 text-2xl font-bold">Interview Stage {stageId}</h1>
      <p>This is the main task area</p>
      <PopoverHint title={tPopover('title')} hint={tPopover('hint')} />
      {/* example stage components */}
      <TooltipHint hint={tTooltip('hint')}>
        <div className="h-48 bg-mustard-dark">Stage component with tip</div>
      </TooltipHint>
    </div>
  );
}
