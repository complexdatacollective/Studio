import { type NodeViewProps } from '@tiptap/core';
import TipTapParagraph from '@tiptap/extension-paragraph';
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';
import TypographyParagraph from '~/components/typography/Paragraph';

const WrappedParagraph = (props: NodeViewProps) => {
  return (
    <NodeViewWrapper>
      <TypographyParagraph {...props.node.attrs}>
        <NodeViewContent as="span" />
      </TypographyParagraph>
    </NodeViewWrapper>
  );
};

export const Paragraph = TipTapParagraph.extend({
  addNodeView() {
    return ReactNodeViewRenderer(WrappedParagraph);
  },
});

export default Paragraph;
