import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

export const LabelNodeView: React.FC<NodeViewProps> = () => {
  return (
    <NodeViewWrapper>
      <NodeViewContent as={'h4'} className="font-extrabold"></NodeViewContent>
    </NodeViewWrapper>
  );
};
