import Node from '~/components/Node';

export type Node = {
  id: string;
  label: string;
};

export default function NodeList({
  items,
  nodeSize = 'lg',
}: {
  items: Node[];
  nodeSize?: 'sm' | 'lg';
}) {
  return (
    <div className="flex w-full items-start justify-center">
      {items.map((node, index) => (
        <Node key={index} label={node.label} size={nodeSize} />
      ))}
    </div>
  );
}
