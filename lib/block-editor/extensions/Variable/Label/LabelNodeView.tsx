import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

export const LabelNodeView: React.FC<NodeViewProps> = () => {
  return (
    // pointerEvents: 'none' is used to prevent selecting the label individually
    // this prevents dragging the label node out of the variable
    <NodeViewWrapper style={{ pointerEvents: 'none' }}>
      <NodeViewContent as={'h4'} className="font-extrabold"></NodeViewContent>
    </NodeViewWrapper>
  );
};
