import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

export const LabelNodeView: React.FC<NodeViewProps> = () => {
  return (
    <NodeViewWrapper>
      <NodeViewContent
        as={'h4'}
        className="text-sm font-extrabold"
      ></NodeViewContent>
    </NodeViewWrapper>
  );
};
