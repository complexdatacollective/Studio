import TiptapHorizontalRule from '@tiptap/extension-horizontal-rule';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import Divider from '~/components/layout/Divider';

const WrappedDivider = () => (
  <NodeViewWrapper>
    <Divider />
  </NodeViewWrapper>
);

export const HorizontalRule = TiptapHorizontalRule.extend({
  addNodeView() {
    return ReactNodeViewRenderer(WrappedDivider);
  },
});

export default HorizontalRule;
