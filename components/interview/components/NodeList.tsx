'use client';

import Node from './Node';

export type Node = {
  id: string;
  label: string;
  type: string;
};

export default function NodeList({ items }: { items: Node[] }) {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      {items.map((node) => (
        <div key={node.id} className="flex items-center justify-center">
          <Node type={node.type} label={node.label} />
        </div>
      ))}
    </div>
  );
}
