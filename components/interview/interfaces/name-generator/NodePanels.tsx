import type { Node } from '~/components/interview/NodeList';
import NodePanel from './NodePanel';

type Panel = {
  id: string;
  title: string;
  nodes: Node[];
};

export default function NodePanels({ panels }: { panels: Panel[] }) {
  return (
    <div id="data-wizard-task-step-2">
      {panels.map((panel) => {
        return <NodePanel key={panel.id} {...panel} />;
      })}
    </div>
  );
}
