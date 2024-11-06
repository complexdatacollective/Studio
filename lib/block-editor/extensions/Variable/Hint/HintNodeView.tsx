import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from '@tiptap/react';
import { cn } from '~/lib/utils';

export const HintNodeView: React.FC<NodeViewProps> = ({ node }) => {
  const isEmpty = node.content.size === 0;

  return (
    <NodeViewWrapper
      style={{ pointerEvents: 'none' }}
      className={cn(
        isEmpty &&
          'relative text-sm before:absolute before:left-0 before:top-0 before:text-muted-foreground before:content-[attr(data-placeholder)]',
      )}
      data-placeholder="Enter a hint..." // potentially could be an attribute on the node
    >
      <NodeViewContent as="h4" className="text-sm" />
    </NodeViewWrapper>
  );
};
