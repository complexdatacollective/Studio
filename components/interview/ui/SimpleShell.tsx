import { type IntRange } from 'type-fest';
import Navigation from './Navigation';
import { cn } from '~/lib/utils';
import { getAvailableLocales } from '~/lib/localisation/locale';

// Shared styles for all interfaces, providing margin.
export const interfaceWrapperClasses = 'my-4';

// Used so we can share the rendering styles in our storybook
export default async function SimpleShell({
  isReadyForNextStage,
  progress,
  children,
}: {
  isReadyForNextStage: boolean;
  progress: IntRange<0, 100>;
  children: React.ReactNode;
}) {
  const availableLocales = await getAvailableLocales('INTERVIEW');
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
