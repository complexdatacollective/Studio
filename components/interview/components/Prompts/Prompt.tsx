'use client';

/**
 * Building block for Prompt component
 * renders a single prompt
 */

export default function Prompt({ id, text }: { id: number; text: string }) {
  return (
    <div title={text} key={id} className="text-3xl">
      {text}
    </div>
  );
}
