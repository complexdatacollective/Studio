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
    <div className="flex h-screen gap-4">
      <Navigation pulseNext={isReadyForNextStage} progress={progress} />
      <div className="my-2 flex">{children}</div>
    </div>
  );
}
