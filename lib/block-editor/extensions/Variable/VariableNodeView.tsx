import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

export const VariableNodeView: React.FC<NodeViewProps> = () => {
  return (
    <NodeViewWrapper>
      {/* adding huge padding to make drag controls for label vs entire variable visually different. needs better solution */}
      <NodeViewContent className="border py-20"></NodeViewContent>
    </NodeViewWrapper>
  );
};
