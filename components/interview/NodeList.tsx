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
    <div className="flex w-full flex-row flex-wrap items-center justify-center">
      {items.map((node) => (
        <div key={node.id} className="flex items-center justify-center">
          <Node label={node.label} size={nodeSize} />
        </div>
      ))}
    </div>
  );
}
