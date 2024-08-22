import type { Node } from '~/components/interview/NodeList';
import NodePanel from './NodePanel';

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
