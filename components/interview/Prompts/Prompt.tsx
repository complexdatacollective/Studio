'use client';

import Heading from '~/components/typography/Heading';

/**
 * Building block for Prompt component
 * renders a single prompt
 */

export default function Prompt({ text }: { text: string }) {
  return (
    <Heading
      variant="h2"
      id="data-wizard-prompts"
      className="mx-auto mb-0 text-center"
    >
      {text}
    </Heading>
  );
}
