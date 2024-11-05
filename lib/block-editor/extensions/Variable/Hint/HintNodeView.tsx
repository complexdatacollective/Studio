import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';

export const HintNodeView: React.FC<NodeViewProps> = () => {
  return (
    // pointerEvents: 'none' is used to prevent selecting the hint individually.
    // this prevents dragging the hint node out of the variable
    <NodeViewWrapper style={{ pointerEvents: 'none' }}>
      <NodeViewContent as={'h4'} className="text-sm"></NodeViewContent>
    </NodeViewWrapper>
  );
};
