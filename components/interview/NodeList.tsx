import Node from '~/components/Node';
import { type TNode } from '~/schemas/network/network';

export default function NodeList({
  items,
  nodeSize = 'lg',
}: {
  items: TNode[];
  nodeSize?: 'sm' | 'lg';
}) {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-2 p-2">
      {items.map((node, index) => (
        <Node key={index} label="Node" size={nodeSize} />
      ))}
    </div>
  );
}
