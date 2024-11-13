import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';
import { useState } from 'react';
import Popover from '~/components/Popover';
import { cn } from '~/lib/utils';
import GroupToolbar from './GroupToolbar';

export const GroupNodeView: React.FC<NodeViewProps> = ({
  node,
  editor,
  deleteNode,
  updateAttributes,
}) => {
  const [selected, setSelected] = useState(false);
  const { columns } = node.attrs;

  return (
    <Popover
      side="top"
      isOpen={selected}
      content={
        <GroupToolbar
          deleteNode={deleteNode}
          editor={editor}
          attributes={node.attrs}
          updateAttributes={updateAttributes}
        />
      }
      onOpenChange={(open) => {
        if (!open) {
          // using this as an onClose event
          setSelected(false);
        }
      }}
    >
      <NodeViewWrapper
        className={cn(
          'gap-4 rounded-small border border-dashed p-4 hover:border-accent',
          selected && 'bg-surface-1',
          columns === 1 && 'grid grid-cols-1',
          columns === 2 && 'grid grid-cols-2',
          columns === 3 && 'grid grid-cols-3',
          columns === 4 && 'grid grid-cols-4',
        )}
        onClick={() => {
          setSelected(true);
        }}
      >
        <NodeViewContent />
      </NodeViewWrapper>
    </Popover>
  );
};
