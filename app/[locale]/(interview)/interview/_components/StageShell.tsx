import TooltipHint from './TaskHints/TooltipHint';

export default function StageShell({ stageId }: { stageId: number }) {
  return (
    <div className="space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">Interview Stage {stageId}</h1>
      <p>This is the main task area</p>
      {/* example stage components */}
      <TooltipHint hint="Interview task hint: ex. click this to nominate a node">
        <div className="h-48 bg-mustard-dark">Stage component with tip</div>
      </TooltipHint>
      <div className="h-48 bg-sea-green-dark">Stage component</div>
      <div className="h-48 bg-neon-coral-dark">Stage component</div>
      <div className="h-48 bg-mustard-dark">Stage component</div>
      <div className="h-48 bg-sea-green-dark">Stage component</div>
      <div className="h-48 bg-neon-coral-dark">Stage component</div>
    </div>
  );
}
