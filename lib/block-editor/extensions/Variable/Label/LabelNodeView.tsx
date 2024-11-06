import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';
import { cn } from '~/lib/utils';

export const LabelNodeView: React.FC<NodeViewProps> = ({ node }) => {
  const isEmpty = node.content.size === 0;

  return (
    // this prevents dragging the label node out of the variable
    <NodeViewWrapper
      className={cn(
        'pointer-events-none', // used to prevent selecting the label individually
        isEmpty &&
          'relative font-extrabold before:absolute before:left-0 before:top-0 before:text-muted-foreground before:content-[attr(data-placeholder)]',
      )}
      data-placeholder="Enter a label..." // potentially could be an attribute on the node
    >
      <NodeViewContent as="h4" className="font-extrabold" />
    </NodeViewWrapper>
  );
};
