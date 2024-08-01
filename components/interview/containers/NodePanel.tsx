import Panel from '../components/Panel';
import NodeList, { type Node } from '../components/NodeList';

export default function NodePanel({
  nodes,
  title,
}: {
  nodes: Node[];
  title: string;
}) {
  return (
    <Panel title={title}>
      <NodeList items={nodes} />
    </Panel>
  );
}
