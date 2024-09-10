import { type IntRange } from 'type-fest';
import Navigation from './Navigation';
import { cn } from '~/lib/utils';

// Shared styles for all interfaces, providing margin.
export const interfaceWrapperClasses = 'my-4';

// Used so we can share the rendering styles in our storybook
export default function SimpleShell({
  isReadyForNextStage,
  progress,
  children,
}: {
  isReadyForNextStage: boolean;
  progress: IntRange<0, 100>;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'flex h-[100dvh] w-[100dvw] flex-col-reverse gap-4',
        'md:flex-row',
      )}
    >
      <Navigation pulseNext={isReadyForNextStage} progress={progress} />
      {children}
    </div>
  );
}
