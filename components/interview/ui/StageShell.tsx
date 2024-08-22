import type { Stage } from '@prisma/client';

import NameGenerator from '~/components/interview/interfaces/name-generator/NameGenerator';

// This is the shell for the interview stage. It contains the main task area and interview task hints/participant instructions.
export default function StageShell({ stage }: { stage: Stage }) {
  return (
    <div className="p-8">
      {stage.type === 'NameGenerator' && <NameGenerator />}
    </div>
  );
}
