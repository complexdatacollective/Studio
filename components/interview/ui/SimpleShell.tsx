import { type IntRange } from 'type-fest';
import Navigation from './Navigation';

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
    <div className="flex h-screen">
      <Navigation pulseNext={isReadyForNextStage} progress={progress} />

      <div className="flex-1 overflow-hidden overflow-y-auto">{children}</div>
    </div>
  );
}
