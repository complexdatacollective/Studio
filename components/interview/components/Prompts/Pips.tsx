import { cn } from 'lib/utils';

/**
 * Renders a set of pips indicating the current `Prompt`.
 * todo: add `large` prop
 */

export default function Pips({
  count,
  currentIndex,
}: {
  count: number;
  currentIndex: number;
}) {
  return (
    <div className="flex w-full items-center justify-center space-x-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'h-4 w-4 rounded-full border-2 border-white border-opacity-15 transition-colors ease-in',
            index === currentIndex
              ? 'bg-white bg-opacity-15'
              : 'bg-transparent',
          )}
        />
      ))}
    </div>
  );
}
