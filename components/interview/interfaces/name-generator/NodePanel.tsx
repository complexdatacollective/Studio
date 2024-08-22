import Panel from './Panel';
import NodeList, { type Node } from '../../NodeList';

export default function NodePanel({
  nodes,
  title,
}: {
  nodes: Node[];
  title: string;
}) {
  return (
    <Panel title={title}>
      <NodeList items={nodes} nodeSize="sm" />
    </Panel>
  );
}
