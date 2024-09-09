'use client';

import { headingVariants } from '~/components/typography/Heading';
import { cn } from '~/lib/utils';

/**
 * Building block for Prompt component
 * renders a single prompt
 */

export default function Prompt({ text }: { text: string }) {
  return (
    <h1
      id="data-wizard-prompts"
      className={cn(
        headingVariants({ variant: 'h2' }),
        'mx-auto mb-0 text-center',
      )}
    >
      {text}
    </h1>
  );
}
