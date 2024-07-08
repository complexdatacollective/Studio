import PopoverHint from '~/components/ui/PopoverHint';
import TooltipHint from '~/components/ui/TooltipHint';
import { useTranslations } from 'next-intl';

export default function StageShell({ stageId }: { stageId: number }) {
  const tTooltip = useTranslations('ExampleTooltip');
  const tPopover = useTranslations('ExamplePopover');
  return (
    <div className="space-y-4 bg-navy-taupe p-4 text-white">
      <h1 className="mb-4 text-2xl font-bold">Interview Stage {stageId}</h1>
      <p>This is the main task area</p>
      <PopoverHint title={tPopover('title')} hint={tPopover('hint')} />
      {/* example stage components */}
      <TooltipHint hint={tTooltip('hint')}>
        <div className="h-48 bg-mustard-dark">Stage component with tip</div>
      </TooltipHint>
      <div className="h-48 bg-sea-green-dark">Stage component</div>
      <div className="h-48 bg-neon-coral-dark">Stage component</div>
      <div className="h-48 bg-mustard-dark">Stage component</div>
      <div className="h-48 bg-sea-green-dark">Stage component</div>
      <div className="h-48 bg-neon-coral-dark">Stage component</div>
    </div>
  );
}
