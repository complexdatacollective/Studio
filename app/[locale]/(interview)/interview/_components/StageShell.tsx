//import PopoverHint from './PopoverHint';
//import { useTranslations } from 'next-intl';
import type { Stage } from '@prisma/client';

import NameGenerator from '~/components/interview/interfaces/NameGenerator';

// This is the shell for the interview stage. It contains the main task area and interview task hints/participant instructions.
export default function StageShell({ stage }: { stage: Stage }) {
  // const tTooltip = useTranslations('ExampleTooltip');
  // const tInformationPopover = useTranslations('InformationPopover');
  // const tNameGeneratorPopover = useTranslations('NameGeneratorPopover');

  // const popoverContent =
  //   stage.type === 'NameGenerator'
  //     ? {
  //         title: tNameGeneratorPopover('title'),
  //         hint: tNameGeneratorPopover('hint'),
  //       }
  //     : {
  //         title: tInformationPopover('title'),
  //         hint: tInformationPopover('hint'),
  //       };

  return (
    <div className="space-y-4 p-8">
      {/* <PopoverHint
        popoverContent={
          <>
            <Heading variant="label">{popoverContent.title}</Heading>
            <Paragraph>{popoverContent.hint}</Paragraph>
          </>
        }
      /> */}
      {stage.type === 'NameGenerator' && <NameGenerator />}
    </div>
  );
}
