import NodePanel from './interfaces/name-generator/NodePanel';
import type { Node } from '../components/NodeList';

type Panel = {
  id: string;
  title: string;
  nodes: Node[];
};

export default function NodePanels({ panels }: { panels: Panel[] }) {
  return (
    <div
      data-id="data-wizard-task-step-2"
      data-wizard-step={JSON.stringify({
        content: {
          en: 'Node panel text',
        },
      })}
    >
      {panels.map((panel) => {
        return <NodePanel key={panel.id} {...panel} />;
      })}
    </div>
  );
}
