import NodePanel from './NodePanel';
import type { Node } from '../components/NodeList';

type Panel = {
  id: string;
  title: string;
  nodes: Node[];
};

export default function NodePanels({ panels }: { panels: Panel[] }) {
  return (
    <div data-id="data-wizard-task-step-2">
      {panels.map((panel) => {
        return <NodePanel key={panel.id} {...panel} />;
      })}
    </div>
  );
}
