import PopoverHint from './PopoverHint';
import Tooltip from '~/components/ui/Tooltip';
import { useTranslations } from 'next-intl';
import type { Stage } from '@prisma/client';
import Heading from '~/components/typography/Heading';
import Paragraph from '~/components/typography/Paragraph';

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
      <PopoverHint
        popoverContent={
          <>
            <Heading variant="label">{popoverContent.title}</Heading>
            <Paragraph>{popoverContent.hint}</Paragraph>
          </>
        }
      />
      {/* example stage components */}
      <Tooltip tooltip={tTooltip('hint')}>
        <div className="flex h-48 w-48 items-center justify-center rounded-full bg-neon-coral-dark text-center text-white">
          Example node
        </div>
      </Tooltip>
    </div>
  );
}
