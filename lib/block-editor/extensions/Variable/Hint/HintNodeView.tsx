import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

export const HintNodeView: React.FC<NodeViewProps> = () => {
  return (
    <NodeViewWrapper>
      <NodeViewContent as={'h4'} className="text-sm"></NodeViewContent>
    </NodeViewWrapper>
  );
};
