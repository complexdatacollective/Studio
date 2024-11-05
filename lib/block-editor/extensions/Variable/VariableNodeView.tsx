import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

export const VariableNodeView: React.FC<NodeViewProps> = () => {
  return (
    <NodeViewWrapper>
      <NodeViewContent className="py-2"></NodeViewContent>
    </NodeViewWrapper>
  );
};
