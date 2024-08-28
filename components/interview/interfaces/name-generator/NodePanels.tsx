import type { Node } from '~/components/interview/NodeList';
import NodePanel from './NodePanel';
import { forwardRef } from 'react';

type Panel = {
  id: string;
  title: string;
  nodes: Node[];
};

export default forwardRef(function NodePanels(
  { panels }: { panels: Panel[] },
  ref,
) {
  return (
    <div id="data-wizard-task-step-2" ref={ref} className="flex flex-col gap-4">
      {panels.map((panel) => {
        return <NodePanel key={panel.id} {...panel} />;
      })}
    </div>
  );
});
