import { type IntRange } from 'type-fest';
import Navigation from './Navigation';
import { cn } from '~/lib/utils';
import type { Locale } from '~/lib/localisation/config';

// Shared styles for all interfaces, providing margin.
export const interfaceWrapperClasses = 'my-4';

// Used so we can share the rendering styles in our storybook
export default function SimpleShell({
  isReadyForNextStage,
  progress,
  availableLocales,
  children,
}: {
  isReadyForNextStage: boolean;
  progress: IntRange<0, 100>;
  availableLocales: Locale[];
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex h-[100dvh] w-[100dvw] flex-col-reverse gap-4',
        'md:flex-row',
      )}
    >
      <Navigation
        pulseNext={isReadyForNextStage}
        progress={progress}
        availableLocales={availableLocales}
      />
      {children}
    </div>
  );
}
